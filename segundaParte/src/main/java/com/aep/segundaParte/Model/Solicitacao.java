package com.aep.segundaParte.Model;

import com.aep.segundaParte.enums.NivelPrioridade;
import com.aep.segundaParte.enums.StatusSolicitacao;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "solicitacoes")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Solicitacao {

    @Id
    @Column(nullable = false, length = 8)
    private String protocolo;

    @Column(nullable = false)
    private String nomeCidadao;

    @Column(nullable = false, length = 14)
    private String cpf;

    @Column(nullable = false, length = 500)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NivelPrioridade prioridade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusSolicitacao status;

    @Column(nullable = false)
    private String prazo;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    public Solicitacao(
            String protocolo,
            String nome,
            String cpf,
            String descricao,
            NivelPrioridade prioridade,
            String prazo) {
        this.protocolo = protocolo.toUpperCase();
        this.nomeCidadao = (nome == null) ? "ANÔNIMO" : nome;
        this.cpf = (cpf == null) ? "N/A" : cpf;
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.status = StatusSolicitacao.ABERTA;
        this.prazo = prazo;
        this.dataCriacao = LocalDateTime.now();
    }
}
