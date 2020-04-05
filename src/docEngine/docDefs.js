exports.AccoKey =  "ACCO" // use to INCLUDE record based on the last name. This will account for Accomazzo, Accomazzi, Accomasso, Accomatia
exports.IgnoreKey=  "ACCOMA" // use to EXCLUDE name to display on the auto search.
exports.JsonFolder = "src/docEngine/json/" // location json file with document content
exports.PublicFolder= "Public/"
exports.DocsBaseUrl = "https://accomazzo-document.s3.amazonaws.com/" // location document images
exports.NameAutocmpl= "Names.json"
exports.Birth1700 = {
    json :  "Birth1700.json",
    folder : "Birth1700/"
}
exports.Birth1800 = {
    json : "Birth1800.json",
    folder : "Birth1800/"
}
exports.Death = {
    json : "Death.json",
    folder : "Death/"
}
exports.Marriage = {
    json : "Marriage.json",
    folder : "Marriage/"
}
exports.NameInfo="Names.csv" // list of names with ferquencies
exports.NameFixes="Corrections.csv" // list of the corrections done.