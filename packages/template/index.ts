import dot from 'dot'

interface ITemplateVariables {
  [key: string]: string | number | string[] | number[] | ITemplateVariables | ITemplateVariables[]; // eslint-disable-line
}
interface IParseMailVariablesDTO {
  variables: ITemplateVariables
}
// export interface IParseMailFileDTO extends IParseMailVariablesDTO {
//   file: string;
// }
export interface IParseMailHtmlDTO extends IParseMailVariablesDTO {
  html: string
}

export type IParseMailTemplateDTO = /* IParseMailFileDTO */ IParseMailHtmlDTO

const parse = async (data: IParseMailTemplateDTO): Promise<string> => {
  const { variables } = data

  const templateContent = data.html

  const parseTemplate = dot.compile(templateContent)

  const par = parseTemplate(variables)

  return par
}

export const template = {
  parse,
}
