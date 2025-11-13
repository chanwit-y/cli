type Value = string | number | boolean;
type Operator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "and" | "or";

type Term = {
  type: "observe" | "value" | "selectedRow";
  name?: string;
  value?: Value;
};


type TExpression = {
  right: Value  | TExpression;
  left: Value  | TExpression;
  operator: Operator;
};

const input: TExpression = {
  right: {
    right: 1,
    operator: "neq",
    left: 2,
  },
  left: {
    right: 1,
    operator: "eq",
    left: 1,
  },
  operator: "and",
};

export class Expression {
  private _isExpression(term: Value | TExpression): term is TExpression {
    return (
      typeof term === "object" &&
      term !== null &&
      "left" in term &&
      "right" in term &&
      "operator" in term
    );
  }

  private _evaluate(expression: TExpression): boolean {
    switch (expression.operator) {
      case "eq":
        return this._term(expression.left) === this._term(expression.right);
      case "neq":
        return this._term(expression.left) !== this._term(expression.right);
      case "gt":
        return this._term(expression.left) > this._term(expression.right);
      case "gte":
        return this._term(expression.left) >= this._term(expression.right);
      case "lt":
        return this._term(expression.left) < this._term(expression.right);
      case "lte":
        return this._term(expression.left) <= this._term(expression.right);
      case "and":
        return this._term(expression.left) && this._term(expression.right);
      case "or":
        return this._term(expression.left) || this._term(expression.right);
      default:
        return false;
    }
  }

  private _term(term: Value | TExpression): boolean {
    return this._isExpression(term) 
    ? this._evaluate(term) 
    :  Boolean(term);
  }

  public expression(expression: TExpression) {
    return this._evaluate(expression);
  }
}

const expression = new Expression();
console.log(expression.expression(input));
