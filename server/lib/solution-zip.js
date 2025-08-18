import JSZip from "jszip";

const csproj = `<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <ImplicitUsings>enable</ImplicitUsings>
        <Nullable>enable</Nullable>
    </PropertyGroup>
</Project>`;

const entrypoint = 'dotnet run HelloWorld.csproj';

export async function zip(code) {
    const zip = new JSZip();
    zip.file("Program.cs", code);
    zip.file("HelloWorld.csproj", csproj);
    zip.file("entrypoint.sh", entrypoint);
    return await zip.generateAsync({ type: "base64" });
}