using FindMissingNumber;

var result = new Tests().Run();
var verdict = result switch
{
    CorrectAnswerResult => "Ok",
    WrongAnswerResult => "WrongAnswer",
    RuntimeErrorResult => "RuntimeError",
    _ => string.Empty
};

Console.WriteLine($@"
{{
    ""Verdict"": ""{verdict}""
}}");