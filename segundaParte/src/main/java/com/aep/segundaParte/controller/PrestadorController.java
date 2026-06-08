package com.aep.segundaParte.controller;

import com.aep.segundaParte.Service.SolicitacaoService;
import com.aep.segundaParte.dto.SolicitacaoResponse;
import com.aep.segundaParte.security.UsuarioAutenticadoService;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prestador/solicitacoes")
@PreAuthorize("hasRole('PRESTADOR')")
public class PrestadorController {

    private final SolicitacaoService solicitacaoService;
    private final UsuarioAutenticadoService usuarioAutenticadoService;

    public PrestadorController(
            SolicitacaoService solicitacaoService, UsuarioAutenticadoService usuarioAutenticadoService) {
        this.solicitacaoService = solicitacaoService;
        this.usuarioAutenticadoService = usuarioAutenticadoService;
    }

    @GetMapping
    public List<SolicitacaoResponse> listarChamados() {
        return solicitacaoService.listarTodos().stream()
                .map(SolicitacaoResponse::from)
                .toList();
    }

    @PostMapping("/{protocolo}/aceitar")
    public SolicitacaoResponse aceitar(@PathVariable String protocolo) {
        var prestador = usuarioAutenticadoService.obterUsuarioLogado();
        return SolicitacaoResponse.from(solicitacaoService.aceitar(protocolo, prestador));
    }

    @PostMapping("/{protocolo}/desistir")
    public SolicitacaoResponse desistir(@PathVariable String protocolo) {
        var prestador = usuarioAutenticadoService.obterUsuarioLogado();
        return SolicitacaoResponse.from(solicitacaoService.desistir(protocolo, prestador));
    }

    @PostMapping("/{protocolo}/concluir")
    public SolicitacaoResponse concluir(@PathVariable String protocolo) {
        var prestador = usuarioAutenticadoService.obterUsuarioLogado();
        return SolicitacaoResponse.from(solicitacaoService.concluir(protocolo, prestador));
    }
}
