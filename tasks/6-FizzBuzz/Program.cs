using System.Text.Json;
using Task6;

var result = new Tests().Run();

var verdict = result switch
{
    CorrectAnswerResult => "Ok",
    WrongAnswerResult => "WrongAnswer",
    RuntimeErrorResult => "RuntimeError",
    _ => string.Empty
};

if (result is WrongAnswerResult wa)
{
    var output = new
    {
        Verdict = verdict,
        Tests = wa.TestInfos.Select(info => new { info.IsPassed })
    };
    Console.WriteLine(JsonSerializer.Serialize(output));
}
else
{
    var output = new { Verdict = verdict };
    Console.WriteLine(JsonSerializer.Serialize(output));
}