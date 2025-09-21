namespace Task9;

public sealed class Tests
{
    public Result Run()
    {
        var publicTests = new[]
        {
            (Array.Empty<int>(), Array.Empty<int>()),
            (new[] { 0 }, new[] { 0 }),
            (new[] { 5, 3 }, new[] { 5, 15 }),
            (new[] { 4, 3, 7 }, new[] { 4, 12, 84 }),
            (new[] { -1, -2, 2 }, new[] { -1, 2, 4 })
        };
        var privateTests = new[]
        {
            (new[] { 15, 30 }, new[] { 15, 450 }),
            (new[] { 4, 3, 7, 0 }, new[] { 4, 12, 84, 0 })
        };

        var tests = publicTests.Concat(privateTests).ToArray();
        var testInfos = new TestInfo[tests.Length];
        var failed = false;
        for (var i = 0; i < tests.Length; i++)
        {
            var (input, expected) = tests[i];
            try
            {
                var actual = Solution.Solve(input);
                if (!actual.SequenceEqual(expected))
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