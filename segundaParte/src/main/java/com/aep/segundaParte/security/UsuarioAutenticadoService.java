package com.aep.segundaParte.security;

import com.aep.segundaParte.Model.Usuario;
import com.aep.segundaParte.Repository.UsuarioRepository;
import com.aep.segundaParte.exception.RegraNegocioException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioAutenticadoService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioAutenticadoService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario obterUsuarioLogado() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RegraNegocioException("Usuário não autenticado.");
        }

        String email = authentication.getName();
        return usuarioRepository
                .findByEmail(email)
                .orElseThrow(() -> new RegraNegocioException("Usuário não encontrado."));
    }
}
