package com.aep.segundaParte.controller;

import com.aep.segundaParte.Service.SolicitacaoService;
import com.aep.segundaParte.dto.SolicitacaoResponse;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ecologista/solicitacoes")
@PreAuthorize("hasRole('ECOLOGISTA')")
public class EcologistaController {

    private final SolicitacaoService solicitacaoService;

    public EcologistaController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @GetMapping
    public List<SolicitacaoResponse> listarChamados() {
        return solicitacaoService.listarAbertosEConcluidos().stream()
                .map(SolicitacaoResponse::from)
                .toList();
    }
}
