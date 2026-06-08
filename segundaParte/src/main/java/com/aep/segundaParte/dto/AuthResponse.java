package com.aep.segundaParte.dto;

import com.aep.segundaParte.Model.Usuario;
import com.aep.segundaParte.enums.TipoUsuario;

public record AuthResponse(String token, Long id, String nome, String email, TipoUsuario tipo) {

    public static AuthResponse of(String token, Usuario usuario) {
        return new AuthResponse(token, usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getTipo());
    }
}
