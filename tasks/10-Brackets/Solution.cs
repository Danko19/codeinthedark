namespace Task10;

public static class Solution
{
    public static bool Solve(string input)
    {
        var st = new Stack<char>();
        foreach (var c in input)
        {
            if (c == '(')
            {
                st.Push(c);
            }
            else
            {
                if (st.Count == 0)
                {
                    return false;
                }

                st.Pop();
            }
        }

        return st.Count == 0;
    }
}