(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{2484:function(module,exports){module.exports=function(hljs){var ELIXIR_IDENT_RE="[a-zA-Z_][a-zA-Z0-9_.]*(\\!|\\?)?",ELIXIR_KEYWORDS="and false then defined module in return redo retry end for true self when next until do begin unless nil break not case cond alias while ensure or include use alias fn quote require import with|0",SUBST={className:"subst",begin:"#\\{",end:"}",lexemes:ELIXIR_IDENT_RE,keywords:ELIXIR_KEYWORDS},LOWERCASE_SIGIL={className:"string",begin:"~[a-z](?=[/|([{<\"'])",contains:[{endsParent:!0,contains:[{contains:[hljs.BACKSLASH_ESCAPE,SUBST],variants:[{begin:/"/,end:/"/},{begin:/'/,end:/'/},{begin:/\//,end:/\//},{begin:/\|/,end:/\|/},{begin:/\(/,end:/\)/},{begin:/\[/,end:/\]/},{begin:/\{/,end:/\}/},{begin:/</,end:/>/}]}]}]},UPCASE_SIGIL={className:"string",begin:"~[A-Z](?=[/|([{<\"'])",contains:[{begin:/"/,end:/"/},{begin:/'/,end:/'/},{begin:/\//,end:/\//},{begin:/\|/,end:/\|/},{begin:/\(/,end:/\)/},{begin:/\[/,end:/\]/},{begin:/\{/,end:/\}/},{begin:/\</,end:/\>/}]},STRING={className:"string",contains:[hljs.BACKSLASH_ESCAPE,SUBST],variants:[{begin:/"""/,end:/"""/},{begin:/'''/,end:/'''/},{begin:/~S"""/,end:/"""/,contains:[]},{begin:/~S"/,end:/"/,contains:[]},{begin:/~S'''/,end:/'''/,contains:[]},{begin:/~S'/,end:/'/,contains:[]},{begin:/'/,end:/'/},{begin:/"/,end:/"/}]},FUNCTION={className:"function",beginKeywords:"def defp defmacro",end:/\B\b/,contains:[hljs.inherit(hljs.TITLE_MODE,{begin:ELIXIR_IDENT_RE,endsParent:!0})]},CLASS=hljs.inherit(FUNCTION,{className:"class",beginKeywords:"defimpl defmodule defprotocol defrecord",end:/\bdo\b|$|;/}),ELIXIR_DEFAULT_CONTAINS=[STRING,UPCASE_SIGIL,LOWERCASE_SIGIL,hljs.HASH_COMMENT_MODE,CLASS,FUNCTION,{begin:"::"},{className:"symbol",begin:":(?![\\s:])",contains:[STRING,{begin:"[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"}],relevance:0},{className:"symbol",begin:ELIXIR_IDENT_RE+":(?!:)",relevance:0},{className:"number",begin:"(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[1-9][0-9_]*(.[0-9_]+([eE][-+]?[0-9]+)?)?)",relevance:0},{className:"variable",begin:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{begin:"->"},{begin:"("+hljs.RE_STARTERS_RE+")\\s*",contains:[hljs.HASH_COMMENT_MODE,{className:"regexp",illegal:"\\n",contains:[hljs.BACKSLASH_ESCAPE,SUBST],variants:[{begin:"/",end:"/[a-z]*"},{begin:"%r\\[",end:"\\][a-z]*"}]}],relevance:0}];return SUBST.contains=ELIXIR_DEFAULT_CONTAINS,{lexemes:ELIXIR_IDENT_RE,keywords:ELIXIR_KEYWORDS,contains:ELIXIR_DEFAULT_CONTAINS}}}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_highlight_elixir.06f98df495620ba77f30.bundle.js.map