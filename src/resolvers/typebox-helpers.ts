import { Type } from "typebox";

class TDateType extends Type.Base<Date> {
  // usado na validação em tempo de execução
  public override Check(value: unknown): value is Date {
    return value instanceof Date && !isNaN((value as Date).getTime());
  }

  // usado para gerar mensagens de erro detalhadas
  public override Errors(value: unknown): object[] {
    return !this.Check(value) ? [{ message: "not a date" }] : [];
  }

  // obrigatório para composição (Partial, Required, Pick, Omit, etc.)
  public override Clone(): TDateType {
    return new TDateType();
  }
}

// factory
export function TBDate(): TDateType {
  return new TDateType();
}
