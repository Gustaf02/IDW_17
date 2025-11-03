const datosInicialesMedicos = [
  {
    id: 1,
    nombre: "Mario",
    apellido: "Gómez",
    matricula: "3456789",
    especialidad: "Dermatología",
    obraSociales: ["OSDE", "Galeno"],
    valorConsulta: 16000.0,
    descripcion: "El Dr. Mario Gómez se especializa en el tratamiento de enfermedades de la piel y realiza controles dermatológicos preventivos.",
    foto: "img/Cat_Doctor_1.png"
  },
  {
    id: 2,
    nombre: "Juan",
    apellido: "Pérez",
    matricula: "1234567",
    especialidad: "Cardiología",
    obraSociales: ["Swiss Medical", "OSDE"],
    valorConsulta: 18000.0,
    descripcion: "El Dr. Pérez es especialista en enfermedades cardiovasculares y realiza estudios preventivos.",
    foto: "img/Cat_Doctor_2.png"
  },
  {
    id: 3,
    nombre: "Ana",
    apellido: "Torres",
    matricula: "9876543",
    especialidad: "Pediatría",
    obraSociales: ["Galeno", "OSDE"],
    valorConsulta: 16500.0,
    descripcion: "La Dra. Torres se dedica a la atención integral de niños y adolescentes, priorizando la prevención.",
    foto: "img/Cat_Doctor_3.png"
  },
  {
    id: 4,
    nombre: "Carlos",
    apellido: "López",
    matricula: "1122334",
    especialidad: "Traumatología",
    obraSociales: ["OSDE", "Galeno"],
    valorConsulta: 17000.0,
    descripcion: "El Dr. López se dedica a lesiones musculoesqueléticas y tratamientos traumatológicos.",
    foto: "img/Cat_Doctor_4.png"
  },
  {
    id: 5,
    nombre: "Sofía",
    apellido: "Ríos",
    matricula: "9988776",
    especialidad: "Ginecología",
    obraSociales: ["Swiss Medical", "OSDE"],
    valorConsulta: 18000.0,
    descripcion: "La Dra. Ríos ofrece atención ginecológica integral con enfoque en salud preventiva.",
    foto: "img/Cat_Doctor_5.png"
  },
  {
    id: 6,
    nombre: "Martín",
    apellido: "Silva",
    matricula: "5566778",
    especialidad: "Neurología",
    obraSociales: ["OSDE", "Galeno"],
    valorConsulta: 18000.0,
    descripcion: "El Dr. Silva es especialista en patologías neurológicas y realiza evaluaciones preventivas.",
    foto: "img/Cat_Doctor_6.png"
  },
  {
    id: 7,
    nombre: "Carla",
    apellido: "Méndez",
    matricula: "2233445",
    especialidad: "Reumatología",
    obraSociales: ["OSDE", "Swiss Medical"],
    valorConsulta: 16000.0,
    descripcion: "La Dra. Méndez trabaja con terapia individual y grupal, enfocándose en bienestar emocional.",
    foto: "img/Cat_Doctor_7.png"
  },
  {
    id: 8,
    nombre: "Federico",
    apellido: "Ramos",
    matricula: "3344556",
    especialidad: "Endocrinología",
    obraSociales: ["Galeno", "OSDE"],
    valorConsulta: 12000.0,
    descripcion: "El Dr. Ramos trata trastornos hormonales y enfermedades metabólicas.",
    foto: "img/Cat_Doctor_8.png"
  },
  {
    id: 9,
    nombre: "Valeria",
    apellido: "Suárez",
    matricula: "4455667",
    especialidad: "Nutrición",
    obraSociales: ["OSDE", "Swiss Medical"],
    valorConsulta: 14000.0,
    descripcion: "La Dra. Suárez realiza planes nutricionales personalizados y seguimiento de pacientes.",
    foto: "img/Cat_Doctor_9.png"
  },
  {
    id: 10,
    nombre: "Marcelo",
    apellido: "Ortiz",
    matricula: "5566779",
    especialidad: "Oftalmología",
    obraSociales: ["OSDE", "Galeno"],
    valorConsulta: 15800.0,
    descripcion: "El Dr. Ortiz se especializa en cirugías y tratamientos de la visión.",
    foto: "img/Cat_Doctor_10.png"
  },
  {
    id: 11,
    nombre: "Lucía",
    apellido: "Fernández",
    matricula: "6677889",
    especialidad: "Reumatología",
    obraSociales: ["Swiss Medical", "OSDE"],
    valorConsulta: 13000.0,
    descripcion: "La Dra. Fernández trata enfermedades reumáticas y articulares, buscando mejorar la movilidad del paciente.",
    foto: "img/Cat_Doctor_11.png"
  },
  {
    id: 12,
    nombre: "Ricardo",
    apellido: "Medina",
    matricula: "7788990",
    especialidad: "Cirugía general",
    obraSociales: ["OSDE", "Galeno"],
    valorConsulta: 18000.0,
    descripcion: "El Dr. Medina realiza cirugías y procedimientos quirúrgicos con enfoque en seguridad y recuperación rápida.",
    foto: "img/Cat_Doctor_12.png"
  },
  {
    id: 13,
    nombre: "Gabriela",
    apellido: "Díaz",
    matricula: "8899001",
    especialidad: "Endodoncia",
    obraSociales: ["OSDE", "Swiss Medical"],
    valorConsulta: 17500.0,
    descripcion: "La Dra. Díaz se dedica a tratamientos de conducto y cuidado integral de la salud dental.",
    foto: "img/Cat_Doctor_13.png"
  },
  {
    id: 14,
    nombre: "Alejandro",
    apellido: "Vargas",
    matricula: "9900112",
    especialidad: "Urología",
    obraSociales: ["Galeno", "OSDE"],
    valorConsulta: 15000.0,
    descripcion: "El Dr. Vargas se especializa en el diagnóstico y tratamiento de enfermedades del aparato urinario.",
    foto: "img/Cat_Doctor_14.png"
  },
  {
    id: 15,
    nombre: "Mariana",
    apellido: "López",
    matricula: "1011121",
    especialidad: "Fonoaudiología",
    obraSociales: ["OSDE", "Swiss Medical"],
    valorConsulta: 14200.0,
    descripcion: "La Dra. López trabaja en la evaluación y rehabilitación de problemas de habla y comunicación.",
    foto: "img/Cat_Doctor_15.png"
  }
];

const datosInicialesEspecialidades = [
  { id: 1, nombre: "Cardiología" },
  { id: 2, nombre: "Dermatología" },
  { id: 3, nombre: "Pediatría" },
  { id: 4, nombre: "Traumatología" },
  { id: 5, nombre: "Ginecología" },
  { id: 6, nombre: "Neurología" },
  { id: 7, nombre: "Reumatología" },
  { id: 8, nombre: "Endocrinología" },
  { id: 9, nombre: "Nutrición" },
  { id: 10, nombre: "Oftalmología" },
  { id: 11, nombre: "Cirugía general" },
  { id: 12, nombre: "Endodoncia" },
  { id: 13, nombre: "Urología" },
  { id: 14, nombre: "Fonoaudiología" }
];

const datosInicialesObrasSociales = [
  { id: 1, nombre: "OSDE", descuento: 40 },
  { id: 2, nombre: "Swiss Medical", descuento: 75 },
  { id: 3, nombre: "Galeno", descuento: 50 },
  { id: 4, nombre: "OSER", descuento: 20 },
  { id: 5, nombre: "PAMI", descuento: 100 },
  { id: 6, nombre: "Particular", descuento: 0 },
  { id: 7, nombre: "Otra", descuento: 0 }
];

const datosInicialesTurnos = [
  // Turnos para Dr. Mario Gómez (ID 1)
  { id: 5, id_medico: 1, fechaHora: "2025-11-11T09:00", disponible: true },
  { id: 6, id_medico: 1, fechaHora: "2025-11-11T10:00", disponible: false }, // Ocupado
  // Turnos para Dr. Juan Pérez (ID 2)
  { id: 1, id_medico: 2, fechaHora: "2025-11-10T10:00", disponible: true },
  { id: 2, id_medico: 2, fechaHora: "2025-11-10T11:00", disponible: true },
  { id: 3, id_medico: 2, fechaHora: "2025-11-12T15:00", disponible: false }, // Ocupado
  { id: 4, id_medico: 2, fechaHora: "2025-11-12T16:00", disponible: true },
];

const datosInicialesReservas = [
  {
    id: 1,
    id_turno: 3,
    id_medico: 2,
    especialidad: "Cardiología",
    valor_total: 18000.00,
    nombre_paciente: "Emily Johnson (Dummy)",
    documento: "D-987654",
    obra_social: "Particular"
  },

  {
    id: 2,
    id_turno: 6,
    id_medico: 1,
    especialidad: "Dermatología",
    valor_total: 12800.00,
    nombre_paciente: "Michael Williams (Dummy)",
    documento: "D-123456",
    obra_social: "Galeno"
  }
];