namespace Task4;

public sealed class Tests
{
    public Result Run()
    {
        var publicTests = new[]
        {
            ("", ""),
            ("aaa", "a3"),
            ("abc", "abc"),
            ("abba", "ab2a"),
            ("aabcccccaaa", "a2bc5a3"),
        };
        var privateTests = new[]
        {
            ("a", "a"),
            ("aa", "a2"),
            ("aab", "a2b"),
            ("aabb", "a2b2"),
            ("aaab", "a3b"),
            ("aaabb", "a3b2"),
            ("aaabbb", "a3b3"),
            ("hhhhhelllllooooo", "h5el5o5"),
            ("AAABBBCCCD", "A3B3C3D"),
            ("   ", " 3"),
            ("!!!!!!!!!!!!", "!12"),
            ("abbbbbbbbbbbb", "ab12"),
            ("Mississippi", "Mis2is2ip2i"),
            ("zzzzzzzzzzzzzzzzzzzz", "z20"),
            ("abcabcabc", "abcabcabc"),
            ("a", "a"),
            ("aaaaaaaaaaaa", "a12"),
            ("a b c d", "a b c d")
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