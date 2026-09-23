export type Categoria =
    | 'Educación'
    | 'Tecnología'
    | 'Turismo'
    | 'Comercio'

export interface Noticia {
    id: number
    titulo: string
    descripcion: string
    imagen: string
    categoria: Categoria
    contenido: string
    fecha: string
    autor: string
}