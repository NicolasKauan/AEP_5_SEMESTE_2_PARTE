package com.aep.segundaParte.Service;

import com.aep.segundaParte.Model.Usuario;
import com.aep.segundaParte.Repository.UsuarioRepository;
import com.aep.segundaParte.dto.AuthResponse;
import com.aep.segundaParte.dto.CadastroRequest;
import com.aep.segundaParte.dto.LoginRequest;
import com.aep.segundaParte.exception.RegraNegocioException;
import com.aep.segundaParte.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Transactional
    public AuthResponse cadastrar(CadastroRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new RegraNegocioException("E-mail já cadastrado.");
        }
        if (usuarioRepository.existsByCpf(request.cpf())) {
            throw new RegraNegocioException("CPF já cadastrado.");
        }

        Usuario usuario = new Usuario(
                request.nome(),
                request.email(),
                request.cpf(),
                passwordEncoder.encode(request.senha()),
                request.tipo());

        usuarioRepository.save(usuario);
        return AuthResponse.of(jwtService.gerarToken(usuario), usuario);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha()));

        Usuario usuario = usuarioRepository
                .findByEmail(request.email())
                .orElseThrow(() -> new RegraNegocioException("Usuário não encontrado."));

        return AuthResponse.of(jwtService.gerarToken(usuario), usuario);
    }
}
