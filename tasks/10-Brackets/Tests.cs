namespace Task10;

public sealed class Tests
{
    public Result Run()
    {
        var publicTests = new[]
        {
            ("()", true),
            ("", true),
            ("())", false),
            ("(()", false),
            ("()()", true),
            ("(())", true),
            (")(", false),
            ("(()())", true)
        };

        var privateTests = new[]
        {
            ("((()))", true),       // Глубоко вложенные
            ("()(())", true),       // Комбинация
            ("((())", false),       // Не хватает закрывающей
            ("())()", false),       // Лишняя закрывающая
            ("((()()))", true),     // Сложная структура
            (")(()", false),        // Начинается с закрывающей
            ("()((()))", true),     // Составная последовательность
            ("(()))", false)        // Лишняя закрывающая в конце
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