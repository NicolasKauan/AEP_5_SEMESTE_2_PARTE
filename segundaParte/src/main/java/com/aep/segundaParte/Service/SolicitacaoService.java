package com.aep.segundaParte.Service;

import com.aep.segundaParte.Model.RegistroSolicitacaoInput;
import com.aep.segundaParte.Model.Solicitacao;
import com.aep.segundaParte.Repository.SolicitacaoRepository;
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
    public Solicitacao registrar(RegistroSolicitacaoInput input) {
        ResultadoPrioridade resultado = calculadoraPrioridade.calcular(input.pontosTotal());
        String protocolo = geradorProtocolo.gerar();
        String descricao = "LOCAL: " + input.endereco() + " | OBS: " + input.observacao();

        Solicitacao solicitacao = new Solicitacao(
                protocolo,
                input.anonimo() ? null : input.nome(),
                input.anonimo() ? null : input.cpf(),
                descricao,
                resultado.nivel(),
                resultado.prazo());

        return repository.save(solicitacao);
    }

    public Optional<Solicitacao> buscarPorProtocolo(String protocolo) {
        return repository.findById(protocolo.toUpperCase());
    }
}
