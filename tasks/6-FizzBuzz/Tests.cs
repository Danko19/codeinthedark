namespace Task6;

public sealed class Tests
{
    public Result Run()
    {
        var publicTests = new[]
        {
            (1, "1"),
            (3, "Fizz"),
            (5, "Buzz"),
            (15, "FizzBuzz")
        };
        var privateTests = new[]{
            (0, "FizzBuzz"),
            (-3, "Fizz"),
            (-5, "Buzz"),
            (-15, "FizzBuzz"),

            (6, "Fizz"),
            (9, "Fizz"),
            (12, "Fizz"),

            (10, "Buzz"),
            (20, "Buzz"),
            (25, "Buzz"),

            (30, "FizzBuzz"),
            (45, "FizzBuzz"),
            (60, "FizzBuzz"),

            (2, "2"),
            (4, "4"),
            (7, "7"),
            (8, "8"),
            (11, "11"),
            (13, "13"),
            (14, "14"),
            (16, "16"),
            (17, "17"),
            (19, "19"),

            (99, "Fizz"),
            (100, "Buzz"),
            (105, "FizzBuzz")
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