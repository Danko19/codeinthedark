import JSZip from "jszip";
import { getFileContents } from "./tasks.js";


const csproj = `<Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net8.0</TargetFramework>
        <ImplicitUsings>enable</ImplicitUsings>
        <Nullable>enable</Nullable>
    </PropertyGroup>
</Project>`;

const entrypoint = 'dotnet run CodeInTheDark.csproj';

export async function zip(code, taskId) {
    const zip = new JSZip();

    zip.file("Solution.cs", code);
    zip.file("Program.cs", await getFileContents(taskId, "Program.cs"));
    zip.file("Tests.cs", await getFileContents(taskId, "Tests.cs"));
    zip.file("CodeInTheDark.csproj", csproj);
    zip.file("entrypoint.sh", entrypoint);
    //const t = await zip.generateAsync({ type: "nodebuffer" });
    //await writeFile("out.zip", t);

    return await zip.generateAsync({ type: "base64" });
}