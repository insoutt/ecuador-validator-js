declare module "ecuador-validator" {
    export function ci(ci: string): boolean;
    export function ruc(ruc: string): boolean;
    export function cellphone(cellphone: string, type?: 'simple' | 'code'): boolean;
    export function telephone(telephone: string, type?: 'simple' | 'code' | 'international'): boolean;
    export function placaCar(placa: string): boolean;
    export function placaMoto(placa: string): boolean;
}
