package com.aep.segundaParte.Service;

import com.aep.segundaParte.Model.RegistroSolicitacaoInput;
import com.aep.segundaParte.Model.Solicitacao;
import com.aep.segundaParte.Model.Usuario;
import com.aep.segundaParte.Repository.SolicitacaoRepository;
import com.aep.segundaParte.enums.StatusSolicitacao;
import com.aep.segundaParte.exception.RegraNegocioException;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SolicitacaoService {
    private final SolicitacaoRepository repository;
    private final ICalculadoraPrioridade calculadoraPrioridade;
    private final IGeradorProtocolo geradorProtocolo;

    public SolicitacaoService(
            SolicitacaoRepository repository,
            ICalculadoraPrioridade calculadoraPrioridade,
            IGeradorProtocolo geradorProtocolo) {
        this.repository = repository;
        this.calculadoraPrioridade = calculadoraPrioridade;
        this.geradorProtocolo = geradorProtocolo;
    }

    @Transactional
    public Solicitacao registrar(RegistroSolicitacaoInput input, Usuario criador) {
        ResultadoPrioridade resultado = calculadoraPrioridade.calcular(input.pontosTotal());
        String protocolo = geradorProtocolo.gerar();
        String descricao = "LOCAL: " + input.endereco() + " | OBS: " + input.observacao();

        String nome = input.anonimo() ? null : (input.nome() != null ? input.nome() : criador.getNome());
        String cpf = input.anonimo() ? null : (input.cpf() != null ? input.cpf() : criador.getCpf());

        Solicitacao solicitacao = new Solicitacao(
                protocolo, nome, cpf, descricao, resultado.nivel(), resultado.prazo(), criador);

        return repository.save(solicitacao);
    }

    public Optional<Solicitacao> buscarPorProtocolo(String protocolo) {
        return repository.findById(protocolo.toUpperCase());
    }

    @Transactional(readOnly = true)
    public List<Solicitacao> listarAbertosEConcluidos() {
        return repository.findByStatusInOrderByDataCriacaoDesc(
                List.of(StatusSolicitacao.ABERTA, StatusSolicitacao.ANDAMENTO, StatusSolicitacao.FINALIZADA));
    }

    @Transactional(readOnly = true)
    public List<Solicitacao> listarTodos() {
        return repository.findAllByOrderByDataCriacaoDesc();
    }

    @Transactional
    public Solicitacao aceitar(String protocolo, Usuario prestador) {
        Solicitacao solicitacao = buscarOuFalhar(protocolo);
        solicitacao.aceitar(prestador);
        return solicitacao;
    }

    @Transactional
    public Solicitacao desistir(String protocolo, Usuario prestador) {
        Solicitacao solicitacao = buscarOuFalhar(protocolo);
        solicitacao.desistir(prestador);
        return solicitacao;
    }

    @Transactional
    public Solicitacao concluir(String protocolo, Usuario prestador) {
        Solicitacao solicitacao = buscarOuFalhar(protocolo);
        solicitacao.concluir(prestador);
        return solicitacao;
    }

    private Solicitacao buscarOuFalhar(String protocolo) {
        return repository
                .findById(protocolo.toUpperCase())
                .orElseThrow(() -> new RegraNegocioException("Protocolo não localizado."));
    }
}
