export const options = [
  {value: 'button', label: 'Button'},
  {value: 'table', label: 'Table'},
  {value: 'list', label: 'List'},
  {value: 'link', label: 'Link'},
  {value: 'text', label: 'Text'},
  {value: 'select', label: 'Select'},
  {value: 'form', label: 'Form'},
  {value: 'other', label: 'Other'}
]

export var base_tpl =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";


export const button_template =
  "<div>\n\t" +
  "<button>\n\t" +
  "</button>\n" +
  "</div>";

export const table_template =
  "<div>\n" +
  "\t<table>\n" +
  "\t\t<tr>\n" +
  "\t\t\t<th>\n"+
  "\t\t\t</th>\n" +
  "\t\t</tr>\n" +
  "\t\t<tr>\n" +
  "\t\t\t<td>\n" +
  "\t\t\t</td>\n" +
  "\t\t</tr>\n" +
  "\t</table>\n" +
  "</div>"

export const list_template =
  "<div>\n" +
  "\t<ul>\n" +
  "\t\t<li>\n" +
  "\t\t</li>\n" +
  "\t\t<li>\n" +
  "\t\t</li>\n" +
  "\t</ul>\n" +
  "</div>"

export const link_template =
  "<div>\n" +
  "\t<a>\n" +
  "\t</a>\n" +
  "</div>"

export const text_template =
  "<div>\n" +
  "\t<span>\n" +
  "\t</span>\n" +
  "</div>"

export const select_template =
  "<div>\n" +
  "\t<select>\n" +
  "\t\t<option>Example</option>\n" +
  "\t\t<option>Example_1</option>\n" +
  "\t\t<option>Example_2</option>\n" +
  "\t</select>\n" +
  "</div>"

export const form_template =
  "<div>\n" +
  "\t<form>\n"
  "\t\tExample_1:<br>\n" +
  "\t\t<input type='text'><br>\n" +
  "\t\tExmaple_2:<br>\n" +
  "\t\t<input type='text'><br>\n" +
  "\t</form>\n"
  "</div>"

export const animation_template =
  "<div>\n" +
  "</div>"
