import { describe, expect, test } from "vitest";
import simplifyCSharpCode from "./simplifyCSharpCode";

describe("simplifyCSharpCode", () => {
  test("should simplify usings, namespaces and class", () => {
    const code = `
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld {
  class Program {
    static void Main(string[] args) {
      bool isPrime = true;
      Console.WriteLine("Prime Numbers : ");
      for (int i = 2; i <= 100; i++) {
        for (int j = 2; j <= 100; j++) {
          if (i != j && i % j == 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          Console.Write("  " + i);
        }
        isPrime = true;
      }
      Console.ReadKey();
    }
  }
}
  `.trim();

    const expectedCode = `
static void Main(string[] args) {
  bool isPrime = true;
  Console.WriteLine("Prime Numbers : ");
  for (int i = 2; i <= 100; i++) {
    for (int j = 2; j <= 100; j++) {
      if (i != j && i % j == 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      Console.Write("  " + i);
    }
    isPrime = true;
  }
  Console.ReadKey();
}
  `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });

  test("should simplify a single class", () => {
    const code = `
class MyClass {
  public void MyMethod() {
    Console.WriteLine("Hello, World!");
  }
}
  `.trim();

    const expectedCode = `
public void MyMethod() {
  Console.WriteLine("Hello, World!");
}
  `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });

  test("should not simplify multiple classes", () => {
    const code = `
class MyClass1 {
  public void MyMethod() {
    Console.WriteLine("Hello, World!");
  }
}

class MyClass2 {
  public void MyOtherMethod() {
    Console.WriteLine("Hello again!");
  }
}
  `.trim();
    const expectedCode = `
class MyClass1 {
  public void MyMethod() {
    Console.WriteLine("Hello, World!");
  }
}

class MyClass2 {
  public void MyOtherMethod() {
    Console.WriteLine("Hello again!");
  }
}
  `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });

  test("should correctly handle a class with nested elements", () => {
    const code = `
namespace Company.Products {
  public class Car {
    public string Model {
      get;
      set;
    }
    public int Year {
      get;
      set;
    }

    public void StartEngine() {
      Console.WriteLine($"Starting the {Model}...");
    }
  }
}
  `.trim();

    const expectedCode = `
public string Model {
  get;
  set;
}
public int Year {
  get;
  set;
}

public void StartEngine() {
  Console.WriteLine($"Starting the {Model}...");
}
  `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });
});

describe("simple common algorithms", () => {
  test("should simplify a recursive Fibonacci sequence implementation", () => {
    const code = `
using System;

class Fibonacci {
  public static int GetNthFibonacci(int n) {
    if (n <= 1) {
      return n;
    }
    return GetNthFibonacci(n - 1) + GetNthFibonacci(n - 2);
  }
}
    `.trim();

    const expectedCode = `
public static int GetNthFibonacci(int n) {
  if (n <= 1) {
    return n;
  }
  return GetNthFibonacci(n - 1) + GetNthFibonacci(n - 2);
}
    `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });

  test("should simplify a factorial algorithm using a loop", () => {
    const code = `
namespace MathHelpers {
    public class FactorialCalculator {
        public long CalculateFactorial(int n) {
            if (n < 0) {
                throw new ArgumentException("Input must be a non-negative number.");
            }
            long result = 1;
            for (int i = 1; i <= n; i++) {
                result *= i;
            }
            return result;
        }
    }
}
    `.trim();

    const expectedCode = `
public long CalculateFactorial(int n) {
  if (n < 0) {
    throw new ArgumentException("Input must be a non-negative number.");
  }
  long result = 1;
  for (int i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
    `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });

  test("should simplify a recursive sum of array elements", () => {
    const code = `
using System;

namespace ArrayHelpers {
    public class ArraySummer {
        public static int SumArray(int[] array, int index) {
            if (index >= array.Length) {
                return 0;
            }
            return array[index] + SumArray(array, index + 1);
        }
    }
}
    `.trim();

    const expectedCode = `
public static int SumArray(int[] array, int index) {
  if (index >= array.Length) {
    return 0;
  }
  return array[index] + SumArray(array, index + 1);
}
    `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });

  test("should simplify a simple bubble sort implementation", () => {
    const code = `
using System;

class SortAlgorithms {
    public static void BubbleSort(int[] array) {
        int n = array.Length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }
}
    `.trim();

    const expectedCode = `
public static void BubbleSort(int[] array) {
  int n = array.Length;
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        int temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
}
    `.trim();

    expect(simplifyCSharpCode(code).trim()).toBe(expectedCode);
  });
});
