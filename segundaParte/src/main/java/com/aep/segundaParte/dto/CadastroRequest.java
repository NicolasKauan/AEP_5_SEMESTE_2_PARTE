package com.aep.segundaParte.dto;

import com.aep.segundaParte.enums.TipoUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CadastroRequest(
        @NotBlank(message = "Nome é obrigatório.") String nome,
        @NotBlank(message = "E-mail é obrigatório.") @Email(message = "E-mail inválido.") String email,
        @NotBlank(message = "CPF é obrigatório.") @Size(min = 11, max = 14, message = "CPF inválido.") String cpf,
        @NotBlank(message = "Senha é obrigatória.") @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres.")
                String senha,
        @NotNull(message = "Tipo de usuário é obrigatório.") TipoUsuario tipo) {}
