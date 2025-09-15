namespace Task3;

public sealed class Tests
{
    public Result Run()
    {
        var publicTests = new[]
        {
            ("", ""),
            ("A", "a"),
            ("HelloWorld", "hello_world"),
            ("UserId", "user_id"),
            ("ApiV2Endpoint", "api_v2_endpoint"),
        };
        var privateTests = new[]
        {
            ("Simple", "simple"),
            ("NoChange", "no_change"),
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