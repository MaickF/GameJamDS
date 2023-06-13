export interface JwtResponseI {
    dataUser: {
      id: String,
      nombre: String,
      contrasenha: String,
      usuario: String,
      apellido1: String,
      apellido2: String,
      correoElectronico: String,
      telefono: String,
      universidad: String,
      especialidad: String,
      condicionMedica: String,
      necesidadDietetica: String,
      codigoDePais: String,
      rol: String,
      procedencia: String
      accessToken: string,
      expiresIn: string
    }
  }