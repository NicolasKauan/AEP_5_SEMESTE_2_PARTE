package com.aep.segundaParte.dto;

import com.aep.segundaParte.Model.Solicitacao;
import com.aep.segundaParte.Model.Usuario;
import com.aep.segundaParte.enums.NivelPrioridade;
import com.aep.segundaParte.enums.StatusSolicitacao;
import java.time.LocalDateTime;

public record SolicitacaoResponse(
        String protocolo,
        String nomeCidadao,
        String cpf,
        String descricao,
        NivelPrioridade prioridade,
        StatusSolicitacao status,
        String statusDescricao,
        String prazo,
        LocalDateTime dataCriacao,
        String criadorNome,
        String prestadorNome) {

    public static SolicitacaoResponse from(Solicitacao solicitacao) {
        return new SolicitacaoResponse(
                solicitacao.getProtocolo(),
                solicitacao.getNomeCidadao(),
                solicitacao.getCpf(),
                solicitacao.getDescricao(),
                solicitacao.getPrioridade(),
                solicitacao.getStatus(),
                solicitacao.getStatus().getDescricao(),
                solicitacao.getPrazo(),
                solicitacao.getDataCriacao(),
                nomeUsuario(solicitacao.getCriador()),
                nomeUsuario(solicitacao.getPrestadorResponsavel()));
    }

    private static String nomeUsuario(Usuario usuario) {
        return usuario == null ? null : usuario.getNome();
    }
}
