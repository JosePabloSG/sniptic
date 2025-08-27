# Diccionario de Datos – Actividades Evaluadas (classmagic)

> **Versión:** 1.0  
> **Ámbito:** Nuevas tablas para evaluaciones (sin secciones).  
> **Dependencias externas:** `classmagic."Activities"`, `classmagic."StudentActivities"`

---

## Tabla: `classmagic.QuestionTypes`
**Función:** Catálogo de tipos de pregunta.
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `id` | `smallint` | NO | — | **PK** | Identificador del tipo (1=única, 2=múltiple, 3=desarrollo). |
| `name` | `varchar(50)` | NO | — | **UNIQUE** | Nombre simbólico del tipo (`multiple_single`, `multiple_multi`, `open_text`). |

---

## Tabla: `classmagic.ActivityAssessments`
**Función:** Metadatos/configuración cuando una actividad es evaluación (1:1 con Activities).
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `ActivityId` | `integer` | NO | — | **PK**, **FK→** `classmagic."Activities"(PK)` | Actividad dueña de la evaluación. |
| `TotalPoints` | `numeric` | NO | `0` | — | Puntos totales esperados. |
| `TimeLimitMinutes` | `integer` | SÍ | — | — | Límite de tiempo en minutos. |
| `AttemptsAllowed` | `smallint` | NO | `1` | — | Intentos permitidos. |
| `ShuffleQuestions` | `boolean` | NO | `false` | — | Barajar preguntas. |
| `ShuffleChoices` | `boolean` | NO | `false` | — | Barajar opciones. |
| `GradingMode` | `varchar(16)` | NO | `'mixed'` | — | `auto`, `manual` o `mixed`. |

---

## Tabla: `classmagic.AssessmentQuestions`
**Función:** Banco de preguntas por evaluación (sin secciones).
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `id` | `bigserial` | NO | autoincrement | **PK** | Identificador de la pregunta. |
| `ActivityId` | `integer` | NO | — | **FK→** `classmagic."Activities"(PK)` | Evaluación a la que pertenece. |
| `TypeId` | `smallint` | NO | — | **FK→** `QuestionTypes(id)` | Tipo de pregunta. |
| `Prompt` | `text` | NO | — | — | Enunciado. |
| `Points` | `numeric` | NO | `0` | — | Puntaje asignado a la pregunta. |
| `Required` | `boolean` | NO | `false` | — | Si es obligatoria. |
| `OrderIndex` | `smallint` | NO | `1` | — | Orden de visualización. |
| `Feedback` | `text` | SÍ | — | — | Retroalimentación general (opcional). |

---

## Tabla: `classmagic.QuestionChoices`
**Función:** Opciones de una pregunta de selección.
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `id` | `bigserial` | NO | autoincrement | **PK** | Identificador de la opción. |
| `QuestionId` | `bigint` | NO | — | **FK→** `AssessmentQuestions(id)` | Pregunta dueña. |
| `ChoiceText` | `text` | NO | — | — | Texto de la opción. |
| `IsCorrect` | `boolean` | NO | `false` | — | Marca si es correcta. |
| `OrderIndex` | `smallint` | NO | `1` | **UNIQUE** (`QuestionId`,`OrderIndex`) | Orden de la opción por pregunta. |

---

## Tabla: `classmagic.AssessmentAttempts`
**Función:** Intentos de los estudiantes en una evaluación.
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | **PK** | Identificador del intento. |
| `StudentActivityId` | `uuid` | NO | — | **FK→** `classmagic."StudentActivities"(PK)` | Participación del alumno en esa actividad. |
| `AttemptNo` | `smallint` | NO | — | **UNIQUE** (`StudentActivityId`,`AttemptNo`) | Número de intento (1..N). |
| `StartedAt` | `timestamptz` | NO | `now()` | — | Inicio del intento. |
| `SubmittedAt` | `timestamptz` | SÍ | — | — | Envío del intento. |
| `Status` | `varchar(16)` | NO | `'in_progress'` | — | Estado: `in_progress`, `submitted`, `graded`, `void`. |
| `Score` | `numeric` | SÍ | — | — | Puntuación total del intento. |

---

## Tabla: `classmagic.AttemptQuestionResponses`
**Función:** Respuesta (por pregunta) de un intento. Supertabla para texto/selección.
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | **PK** | Identificador de la respuesta. |
| `AttemptId` | `uuid` | NO | — | **FK→** `AssessmentAttempts(id)` | Intento dueño. |
| `QuestionId` | `bigint` | NO | — | **FK→** `AssessmentQuestions(id)` | Pregunta respondida. |
| `AwardedPoints` | `numeric` | SÍ | — | — | Puntos otorgados (auto o manual). |
| `GradedAt` | `timestamptz` | SÍ | — | — | Fecha/hora de calificación. |
| `GradedBy` | `uuid` | SÍ | — | — | Usuario docente que calificó (si aplica). |
| `Feedback` | `text` | SÍ | — | — | Retro por pregunta. |
| `UNIQUE` | — | — | — | (AttemptId, QuestionId) | Una respuesta por pregunta por intento. |

---

## Tabla: `classmagic.ResponseTextAnswers`
**Función:** Contenido de la respuesta para preguntas de desarrollo.
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `ResponseId` | `uuid` | NO | — | **PK**, **FK→** `AttemptQuestionResponses(id)` | Identificador compartido con la respuesta. |
| `AnswerText` | `text` | NO | — | — | Texto enviado por el estudiante. |

---

## Tabla: `classmagic.ResponseChoiceSelections`
**Función:** Opciones elegidas para preguntas de selección.
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `ResponseId` | `uuid` | NO | — | **PK(**parcial**)**, **FK→** `AttemptQuestionResponses(id)` | Respuesta a la que pertenecen las selecciones. |
| `ChoiceId` | `bigint` | NO | — | **PK(**parcial**)**, **FK→** `QuestionChoices(id)` | Opción marcada. |
| **PK compuesta** | — | — | — | **PRIMARY KEY (`ResponseId`,`ChoiceId`)** | Permite 1..N selecciones por respuesta. |

---

## Tabla: `classmagic.ResponseFiles` *(opcional)*
**Función:** Archivos adjuntos a nivel respuesta/pregunta.
| Campo | Tipo | Nulo | Default | Clave | Descripción |
|---|---|---|---|---|---|
| `id` | `bigserial` | NO | autoincrement | **PK** | Identificador del archivo. |
| `ResponseId` | `uuid` | NO | — | **FK→** `AttemptQuestionResponses(id)` | Respuesta dueña del archivo. |
| `FileUrl` | `text` | NO | — | — | URL del archivo (CDN/Storage). |
| `FileName` | `text` | SÍ | — | — | Nombre original. |
| `FileType` | `text` | SÍ | — | — | Tipo/MIME. |
| `UploadedAt` | `timestamptz` | NO | `now()` | — | Fecha/hora de subida. |

---

## Índices y restricciones destacadas
- `idx_assessmentquestions_activity` sobre `AssessmentQuestions(ActivityId)`
- `idx_questionchoices_question` sobre `QuestionChoices(QuestionId)`
- `idx_attempts_student` sobre `AssessmentAttempts(StudentActivityId)`
- `idx_responses_attempt` sobre `AttemptQuestionResponses(AttemptId)`
- `idx_responses_question` sobre `AttemptQuestionResponses(QuestionId)`

---

## Relaciones clave
- `ActivityAssessments.ActivityId` → `classmagic."Activities"(PK)`  
- `AssessmentQuestions.ActivityId` → `classmagic."Activities"(PK)`  
- `AssessmentQuestions.TypeId` → `QuestionTypes.id`  
- `QuestionChoices.QuestionId` → `AssessmentQuestions.id`  
- `AssessmentAttempts.StudentActivityId` → `classmagic."StudentActivities"(PK)`  
- `AttemptQuestionResponses.AttemptId` → `AssessmentAttempts.id`  
- `AttemptQuestionResponses.QuestionId` → `AssessmentQuestions.id`  
- `ResponseTextAnswers.ResponseId` → `AttemptQuestionResponses.id`  
- `ResponseChoiceSelections.(ResponseId, ChoiceId)` → `AttemptQuestionResponses.id`, `QuestionChoices.id`  
- `ResponseFiles.ResponseId` → `AttemptQuestionResponses.id`

---

### Notas de uso
- Autocalificación de selección: comparar las filas de `ResponseChoiceSelections` con `QuestionChoices.IsCorrect` para asignar `AwardedPoints`.  
- Desarrollo: calificación manual en `AttemptQuestionResponses.AwardedPoints`, con `GradedBy` y `GradedAt`.  
- La nota total del intento se guarda en `AssessmentAttempts.Score` (suma de `AwardedPoints`).

