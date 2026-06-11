package com.senac.taskagile.taskagileback.application.DTO;

import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusProjeto;

public record AlterarStatusProjetoRequest(EnumStatusProjeto status) {
}
