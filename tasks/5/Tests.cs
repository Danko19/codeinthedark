namespace Task5;


public sealed class Tests
{
    public Result Run()
    {
        var publicTests = new[]
        {
            (Array.Empty<int>(), -1),
            (new[] { 1 }, 1),
            (new[] { 1, 2, 3 }, 2),
            (new[] { 1, 2 }, 1.5),
            (new[] { 1, 5, 7, 10, 11 }, 7),
            (new[] { 4, 5, 1 }, 4),
            (new[] { 1, 2, 2 }, 2)
        };
        var privateTests = new[]
        {
            (new[] { 2, 2, 2, 2 }, 2),
            (new[] { 1, 3, 3, 6, 7, 8, 9 }, 6),
            (new[] { 1000000, 2000000, 3000000 }, 2000000),
            (new[] { 3, 7, 8, 0 }, 5),
            (new[] { 4, 7, 8, 1 }, 5.5),
        };
        var tests = publicTests.Concat(privateTests).ToArray();
        for (var i = 0; i < tests.Length; i++)
        {
            var (input, expected) = tests[i];
            try
            {
                var actual = Solution.Solve(input);
                if (Math.Abs(actual - expected) > 1e3)
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