package com.aep.segundaParte.Repository;

import com.aep.segundaParte.Model.Solicitacao;
import com.aep.segundaParte.enums.StatusSolicitacao;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, String> {
    List<Solicitacao> findByStatusInOrderByDataCriacaoDesc(List<StatusSolicitacao> statuses);

    List<Solicitacao> findAllByOrderByDataCriacaoDesc();
}
