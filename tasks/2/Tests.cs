namespace IsPalindrome;

public sealed class Tests
{
    public Result Run()
    {
        var tests = new[]
        {
            ("A man, a plan, a canal: Panama", true),
            ("racecar", true),
            ("hello world", false),
            ("", true),
            ("a", true),
            ("No 'x' in Nixon", true)
        };
        for (var i = 0; i < tests.Length; i++)
        {
            var (input, expected) = tests[i];
            try
            {
                var actual = Solution.Solve(input);
                if (actual != expected)
                {
                    return new WrongAnswerResult(i + 1);
                }
            }
            catch
            {
                return new RuntimeErrorResult();
            }
        }

        return new CorrectAnswerResult();
    }
}

public abstract class Result
{
    public abstract TestResult TestResult { get; }
}

public sealed class WrongAnswerResult : Result
{
    public WrongAnswerResult(int firstFailedTest)
    {
        FirstFailedTest = firstFailedTest;
    }

    public override TestResult TestResult => TestResult.WrongAnswer;

    public int FirstFailedTest { get; }
}

public sealed class CorrectAnswerResult : Result
{
    public override TestResult TestResult => TestResult.Passed;
}

public sealed class RuntimeErrorResult : Result
{
    public override TestResult TestResult => TestResult.RuntimeError;
}

public enum TestResult
{
    Passed = 0,
    WrongAnswer = 0,
    RuntimeError = 1,
    TimeLimit = 2
}