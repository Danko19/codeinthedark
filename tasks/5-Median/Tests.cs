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
        var tests = publicTests.Concat(privateTests).ToArray();var testInfos = new TestInfo[tests.Length];
        var failed = false;
        for (var i = 0; i < tests.Length; i++)
        {
            var (input, expected) = tests[i];
            try
            {
                var actual = Solution.Solve(input);
                if (actual != expected)
                {
                    testInfos[i] = new TestInfo(false);
                    failed = true;
                }
                else
                {
                    testInfos[i] = new TestInfo(true);
                }
            }
            catch
            {
                return new RuntimeErrorResult();
            }
        }

        return failed
            ? new WrongAnswerResult(testInfos)
            : new CorrectAnswerResult();
    }
}

public abstract class Result
{
    public abstract TestResult TestResult { get; }
}

public sealed class WrongAnswerResult : Result
{
    public WrongAnswerResult(TestInfo[] testInfos)
    {
        TestInfos = testInfos;
    }

    public override TestResult TestResult => TestResult.WrongAnswer;

    public TestInfo[] TestInfos { get; }
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

public sealed record TestInfo(bool IsPassed);