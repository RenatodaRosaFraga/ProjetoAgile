package com.senac.taskagile.taskagileback.application.DTO;

import com.senac.taskagile.taskagileback.domain.enuns.EnumStatusUsuario;

public record AlterarStatusRequest(EnumStatusUsuario status) {
}
