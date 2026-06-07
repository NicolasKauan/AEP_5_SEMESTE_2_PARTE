package com.aep.segundaParte.controller;

import com.aep.segundaParte.Model.RegistroSolicitacaoInput;
import com.aep.segundaParte.Service.SolicitacaoService;
import com.aep.segundaParte.dto.SolicitacaoResponse;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {

    private final SolicitacaoService solicitacaoService;

    public SolicitacaoController(SolicitacaoService solicitacaoService) {
        this.solicitacaoService = solicitacaoService;
    }

    @PostMapping
    public ResponseEntity<SolicitacaoResponse> registrar(@RequestBody RegistroSolicitacaoInput input) {
        var solicitacao = solicitacaoService.registrar(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(SolicitacaoResponse.from(solicitacao));
    }

    @GetMapping("/{protocolo}")
    public ResponseEntity<?> buscarPorProtocolo(@PathVariable String protocolo) {
        return solicitacaoService
                .buscarPorProtocolo(protocolo)
                .<ResponseEntity<?>>map(s -> ResponseEntity.ok(SolicitacaoResponse.from(s)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("mensagem", "Protocolo não localizado. Verifique se digitou corretamente.")));
    }
}
