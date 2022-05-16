
open System
open System.Text.RegularExpressions

exception InputError of string

let tokenize (expr: string) =
    expr |> (new Regex("\s+|\s*([-+*/])\s*")).Split // Делим строку
         |> Array.toList
         |> List.filter(fun s -> s.Length > 0) // Убираем пустые блоки

let perform (op: string) (stack: decimal list) =
    match (op, stack) with
    | ("+",     a :: b :: cs) -> (b + a) :: cs
    | ("-",     a :: b :: cs) -> (b - a) :: cs
    | ("*",     a :: b :: cs) -> (b * a) :: cs
    | ("/",     a :: b :: cs) -> (b / a) :: cs
    | (n,       cs)           ->
        try
            decimal n :: cs
        with
            | :? System.FormatException -> raise (InputError(n))

let evaluate (expr: string list) =
    let rec evaluate' (expr: string list) (stack: decimal list) =
        match expr with
        | []        -> stack
        | op :: exp -> evaluate' exp (perform op stack)
    evaluate' expr []

[<EntryPoint>]
let main argv = 
    while true do
        printf "-> "
        try
            match Console.ReadLine() |> tokenize |> evaluate with
            | num :: []  -> num   |> printfn "%g"       // Если единственная цифра то выводим её
            | stack      -> stack |> printfn "%O"       // Иначе весь массив
        with
        | InputError(str) -> printfn "Bad input: %s" str
    0