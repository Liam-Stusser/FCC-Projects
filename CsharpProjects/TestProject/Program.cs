//Dice Game
/* 
Random dice= new Random();

int roll1 = dice.Next(1,7);
int roll2 = dice.Next(1,7);
int roll3 = dice.Next(1,7);

int total = roll1 + roll2 + roll3;

Console.WriteLine($"Dice Rolls: {roll1}, {roll2}, {roll3}");
Console.WriteLine($"Total: {total}");

if (roll1 == roll2 || roll2 == roll3 || roll1 == roll3){
    if (roll1 == roll2 && roll1 == roll3){
        Console.WriteLine("Three of a kind! +6 points");
        total += 6;
        Console.WriteLine($"Total: {total}");
        
    } else {
        Console.WriteLine("Two of a kind! +2 points");
        total += 2;
        Console.WriteLine($"Total: {total}");
    }
}

if (total >= 15){
    Console.WriteLine("Congratulations you win a new car!");
}
else if (total >= 12){
    Console.WriteLine("Congratulations you win a new laptop!");
}

else if (total >= 9){
    Console.WriteLine("Congratulations you win a new pair of headphones!");
} else {
    Console.WriteLine("Sorry you win nothing, roll higher next time");
}
*/

//conditionals practice
/*
Random random = new Random();
int daysUntilExperation = random.Next(12);
int discountPercentage = 0;

if(daysUntilExperation <= 10 && daysUntilExperation > 5){
    Console.WriteLine(@"Your subscription expires in " + daysUntilExperation + " days renew soon");
}
else if(daysUntilExperation <= 5 && daysUntilExperation > 1){
    discountPercentage = 0;
    discountPercentage += 10;
    Console.WriteLine(@"Your subscription expires in " + daysUntilExperation + "\nRenew now and save " + discountPercentage +"%!");
}
else if(daysUntilExperation == 1){
    discountPercentage = 0;
    discountPercentage += 20;
    Console.WriteLine(@"Your subscription expires in " + daysUntilExperation + "\nRenew now and save " + discountPercentage +"%!");
}
else if (daysUntilExperation == 0){
    Console.WriteLine("Your subscription has expired");
}
else{
    return;
}
*/
/*
string[] orderIds = ["B123","C234","A345","C15","B177","G3003","C235","B179"];

foreach(string id in orderIds){
    if(id.StartsWith("B")){
        Console.WriteLine(id);
    }
}
*/
/*
Console.WriteLine("a" == "a");
Console.WriteLine("a" == "A");
Console.WriteLine(1 == 2);

string myValue = "a";
Console.WriteLine(myValue == "a");


string panagram = "The quick brown fox jumps over the lazy dog";
int value = 1000;
Console.WriteLine(panagram.StartsWith("T"));
Console.WriteLine(panagram.EndsWith("dog"));
Console.WriteLine(panagram.Contains("quick brown fox"));
Console.WriteLine($"Discount: {(value >= 1000 ? 100 : 50)}");
*/
/*
Random coinFlip = new Random();
string result = coinFlip.Next(1,3) >= 2? "Heads" : "Tails";
Console.WriteLine(result);
*/
/*
int employeeLevel = 100;
string employee = "John Doe";
string title = "";

switch(employeeLevel) {
    case 100:
        title = "Junior Associate";
        break;
    case 200:
        title = "Seinor Associate";
        break;
    case 300:
        title = "Manager";
        break;
    case 400:
        title = "Seinor Manager";
        break;
    case 500:
        title = "Director";
        break;
}

Console.WriteLine($"Employee: {employee}, {title}");
*/

//FizzBuzz
/*
for(int i = 1; i <= 100; i++){
    if(i % 3 == 0 && i % 5 == 0)
        Console.WriteLine($"{i} - FizzBuzz");
    else if(i % 5 == 0)
        Console.WriteLine($"{i} - Buzz");
    else if(i % 3 == 0)
        Console.WriteLine($"{i} - Fizz");
        else
            Console.WriteLine(i);
}
*/
/*
Random number = new Random();
int current = 0;
int keepCount = 0;

do
{
    current = number.Next(1,11);
    Console.WriteLine(current);
    ++keepCount;
} while(current != 7);
Console.WriteLine($"Ran: {keepCount} times"); //Highscore: ran 51 times
*/

//Validate integer input
/*
string? input;
int value = 0;
bool validEntry = false;

Console.WriteLine("Enter a number between 5 and 10:");

while (!validEntry)
{
    input = Console.ReadLine();

    if (input != null)
    {
        string cleanedInput = input.Trim().ToLower();

        if (int.TryParse(cleanedInput, out value))
        {
            if (value >= 5 && value <= 10)
            {
                validEntry = true;
            }
            else
            {
                Console.WriteLine("Sorry, you entered an invalid number. Please try again.");
            }
        }
        else
        {
            Console.WriteLine("That's not a valid number. Please enter a number between 5 and 10.");
        }
    }
    else
    {
        Console.WriteLine("Please enter a number.");
    }
}

Console.WriteLine($"Thanks! You entered: {value}");
*/

//Process contents of string array
/*
string[] myStrings = new string[2] { "I like pizza. I like roast chicken. I like salad", "I like all three of the menu choices" };

foreach(string original in myStrings){

    string myString = original;
    int periodLocation = original.IndexOf('.');
    bool lastCheck = true;
    
    do
    {
        if(periodLocation == -1){
            Console.WriteLine(myString);
            lastCheck = false; continue;
        }
        string sentence = myString.Substring(0, periodLocation);
        Console.WriteLine(sentence);

        myString = myString.Remove(0, periodLocation+1);
        myString = myString.TrimStart();

        periodLocation = myString.IndexOf('.');
    
    } while(lastCheck);

}
*/

//Testing if pressing the tab key is read as one whitespace in length or multiple vs \t
//Result pressing tab is read as individual white spaces with UTF-16 code 32 and \t is 1 character ASCII code 9
/*
string test = "this is\ta   test";
Console.WriteLine(test.Length);
foreach(char c in test){
    Console.WriteLine($"'{c}' = {(int)c}");
}
*/

//Casting Conversions
/*
int first =2;
string second = "4";
string result = first + second;
Console.WriteLine(result);

decimal mydecimal = 1.30485840m;
float myFloat = (float)mydecimal;

Console.WriteLine($"Decimal: {mydecimal}");
Console.WriteLine($"Float  : {myFloat}");

int flirst = 5;
int slercond = 7;
string flercond = flirst.ToString() + slercond.ToString();
Console.WriteLine(flercond);

string third = "5";
string fourth = "7";
int sum = int.Parse(third) + int.Parse(fourth);
Console.WriteLine(sum);

string value1 = "5";
string value2 = "7";
int final = Convert.ToInt32(value1) * Convert.ToInt32(value2);
Console.WriteLine(final);

int value3 = (int)1.5m;
Console.WriteLine(value3);

int value4 = Convert.ToInt32(1.5m);
Console.WriteLine(value4);

string anotherExample = "102";
int italianResult = 0;
if(int.TryParse(anotherExample, out italianResult)){
 Console.WriteLine($"Measurement: {italianResult}");
 } else {
    Console.WriteLine("Unable to report the measurement");
 } 
 Console.WriteLine($"Measurement (w/offset): {50 + italianResult}");
 */

//Conversion Practice Problem
/*
string[] values = { "12.3", "45", "ABC", "11", "DEF" };
string output = "";
double total = 0;

foreach(string value in values){
   if(double.TryParse(value, out double number)){
       total += number;
   } else {
       output += value;
   }
}
Console.WriteLine(output + "\n" + total);
*/

//Conversion Practice Problem 2
/*
int value1 = 11;
decimal value2 = 6.2m;
float value3 = 4.3f;

int result1 = Convert.ToInt32(value1 / value2);
decimal result2 = value2 / (decimal)value3;
float result3 = value3 / value1;

Console.WriteLine($"Divide value1 by value2, display the result as an int: {result1}");

Console.WriteLine($"Divide value2 by value3, display the result as a decimal: {result2}");

Console.WriteLine($"Divide value3 by value1, display the result as a float: {result3}");
*/

/*
string message = "What is the value <span>between the tags</span>?";
Console.WriteLine(message.IndexOf("<span>"));

string message = "This--is--ex-amp-le--data";
message = message.Replace("--", " ");
message = message.Replace("-", "");
Console.WriteLine(message);
*/

/*
static void DisplayRandomNumbers() {
    Random rand = new Random();
    int[] numbers = new int[5];
    for(int i = 0; i < numbers.Length; i++){
        numbers[i] = rand.Next(1,101);
    }
    foreach (int num in numbers)
    {
        Console.WriteLine(num);
    }
}

DisplayRandomNumbers();
*/

/*
VerifyIp(["107.31.1.5", "255.0.0.255", "555..0.555", "255...255"]);

void VerifyIp(string[] ipv4Input){

foreach(string ip in ipv4Input){

string[] splitIpv4 = ip.Split(".");

    bool validLength = false;
    bool validZeros = false;
    bool validRange = false;

    if(splitIpv4.Length != 4){
        validLength = false;
    }else {
        validLength = true;
    }

    foreach (string num in splitIpv4){
       if(num.Length > 1 && num.StartsWith("0")){
            validZeros = false;
            break;
       }
       validZeros = true;
    }

    for(int i = 0; i < splitIpv4.Length; i++){
    if (!int.TryParse(splitIpv4[i], out int temp)) {
        validRange = false;
        break;
    }

    if(temp >= 0 && temp <= 255){
        validRange = true;
        continue;
    } else {
        validRange = false;
        break;
    }
}

    if(validLength && validZeros && validRange) {
        Console.WriteLine($"{ip} is a valid address");
    }else{
        Console.WriteLine($"{ip} is not a valid address");
    }
}
}
*/

//testing refernce type variables in a method
/*
int a = 3;
int b = 4;
int c = 0;

Multiply(a,b,c);
Console.WriteLine($"Global statement: {a} x {b} = {c}");

void Multiply(int a, int b, int c)
{
    c = a*b;
    Console.WriteLine($"Inside multiply method: {a} x {b} = {c}");
}
*/

//Note for future used a name variable for the domain name, this way the domain defaults to contoso or 
//you can specify the external domain in the parameter of the method.
/*
string[,] corporate = 
{
    {"Robert", "Bavin"}, {"Simon", "Bright"},
    {"Kim", "Sinclair"}, {"Aashrita", "Kamath"},
    {"Sarah", "Delucchi"}, {"Sinan", "Ali"}
};

string[,] external = 
{
    {"Vinnie", "Ashton"}, {"Cody", "Dysart"},
    {"Shay", "Lawrence"}, {"Daren", "Valdes"}
};

string externalDomain = "hayworth.com";

for (int i = 0; i < corporate.GetLength(0); i++) 
{
    string email = NameToEmail(corporate[i,0],corporate[i,1]) + "@contoso.com";
    Console.WriteLine(email);
}

for (int i = 0; i < external.GetLength(0); i++) 
{
    string email = NameToEmail(external[i,0], external[i,1]) + "@" + externalDomain;
    Console.WriteLine(email);
}

static string NameToEmail(string firstName, string lastName) {
    string firstTwoInitals = firstName.Substring(0,2).ToLower();
    string last = lastName.ToLower();
    string email = firstTwoInitals + last;
    return email;
}
*/

//Improved dice game
/*
Random rand = new Random();

Console.WriteLine("Would you like to play? (Y/N)");

if(ShouldPlay()){
    PlayGame();
}else{
    Console.WriteLine("See you next time! Rerun the program to start over");
}

string WinOrLose(int roll, int target) {

    return roll > target ? "You Win!" : "Sorry you Lose";
}

 void PlayGame() {
    bool gameLoop = true;

    while(gameLoop){
        int target = rand.Next(1,6);
        int roll = rand.Next(1,7);

        Console.WriteLine($"Roll a number greater than {target} to win!");
        Console.WriteLine($"You rolled a {roll}");
        Console.WriteLine(WinOrLose(roll,target));
        Console.WriteLine("\nPlay again? (Y/N)");
        gameLoop = ShouldPlay();
    }
 }

 static bool ShouldPlay(){

    string? input = Console.ReadLine();

    if(input != null){
        input = input.Trim().ToLower();
        if (input == "y")
            return true;
        else if (input == "n")
            return false;
        else
        {
            Console.WriteLine("Please enter Y or N");
            return ShouldPlay();
        }
    }else{
        Console.WriteLine("Please enter a valid response");
        return ShouldPlay();
    }
    
}
*/

//D20 I made in 2 minutes
/*
Random rand = new Random();
bool loop = true;

int Roll() {
int d20 = rand.Next(1,21);
return d20;
}

while(loop){
    Console.WriteLine("Roll dice (y/n)");
    string? input = Console.ReadLine();
    if(input != null){
        input = input.Trim().ToLower();
        if(input == "y"){
            Console.WriteLine(Roll());
        }
        else if(input == "n"){
            loop = false;
            break;
        }
        else{
            Console.WriteLine("Please enter a valid input");
        }
    }else{
        Console.WriteLine("Please enter a response");
    }
}
*/

//Zoo Practice Problem
/*
string[] pettingZoo = 
{
    "alpacas", "capybaras", "chickens", "ducks", "emus", "geese", 
    "goats", "iguanas", "kangaroos", "lemurs", "llamas", "macaws", 
    "ostriches", "pigs", "ponies", "rabbits", "sheep", "tortoises",
};

PlanSchoolVisit("School A");
PlanSchoolVisit("School B", 3);
PlanSchoolVisit("School C", 2);

void PlanSchoolVisit(string schoolName, int groups = 6) {
    RandomizeAnimals();
    string[,] group1 = AssignGroup(groups);
    Console.WriteLine(schoolName);
    PrintGroup(group1);
}

void RandomizeAnimals(){
    Random rand = new Random();
    for(int i = pettingZoo.Length - 1; i >= 0; i--){
        int j = rand.Next(i+1);
        (pettingZoo[i], pettingZoo[j]) = (pettingZoo[j], pettingZoo[i]);
    }
}

string[,] AssignGroup(int groups = 6){
    string[,] result = new string [groups, pettingZoo.Length/groups];
    int start = 0;
    for(int i = 0; i < groups; i++){

        for(int j = 0; j < result.GetLength(1); j++){
            result[i,j] = pettingZoo[start++];
        }

    }

    return result;
};

void PrintGroup(string[,] group) {
    for(int i = 0; i < group.GetLength(0); i++){
        Console.Write($"Group {i + 1}: ");
        for(int j = 0; j < group.GetLength(1); j++){
            Console.Write($"{group[i,j]}, ");
        }
        Console.WriteLine();
    }
}
*/

//Mini-Game
/*
Random random = new Random();
Console.CursorVisible = false;
int height = Console.WindowHeight - 1;
int width = Console.WindowWidth - 5;
bool shouldExit = false;

// Console position of the player
int playerX = 0;
int playerY = 0;

// Console position of the food
int foodX = 0;
int foodY = 0;

// Available player and food strings
string[] states = {"('-')", "(^-^)", "(X_X)"};
string[] foods = {"@@@@@", "$$$$$", "#####"};

// Current player string displayed in the Console
string player = states[0];

// Index of the current food
int food = 0;

InitializeGame();
while (!shouldExit) 
{
    if(TerminalResized())
        EndGame();

    Move();
}

// Returns true if the Terminal was resized 
bool TerminalResized() 
{
    return height != Console.WindowHeight - 1 || width != Console.WindowWidth - 5;
}

// Displays random food at a random location
void ShowFood() 
{
    // Update food to a random index
    food = random.Next(0, foods.Length);

    // Update food position to a random location
    foodX = random.Next(0, width - player.Length);
    foodY = random.Next(0, height - 1);

    // Display the food at the location
    Console.SetCursorPosition(foodX, foodY);
    Console.Write(foods[food]);
}

// Changes the player to match the food consumed
void ChangePlayer() 
{
    player = states[food];
    Console.SetCursorPosition(playerX, playerY);
    Console.Write(player);
}

// Temporarily stops the player from moving
void FreezePlayer() 
{
    Thread.Sleep(1000);
    player = states[0];
}

// Reads directional input from the Console and moves the player
void Move() 
{
    int lastX = playerX;
    int lastY = playerY;
    
    switch (Console.ReadKey(true).Key) 
    {
        case ConsoleKey.UpArrow:
            playerY--; 
            break;
		case ConsoleKey.DownArrow: 
            playerY++; 
            break;
		case ConsoleKey.LeftArrow:  
            playerX--; 
            break;
		case ConsoleKey.RightArrow: 
            playerX++; 
            break;
		case ConsoleKey.Escape:     
            shouldExit = true; 
            break;
        default:
            EndGame();
            break;
    }

    // Clear the characters at the previous position
    Console.SetCursorPosition(lastX, lastY);
    for (int i = 0; i < player.Length; i++) 
    {
        Console.Write(" ");
    }

    // Keep player position within the bounds of the Terminal window
    playerX = (playerX < 0) ? 0 : (playerX >= width ? width : playerX);
    playerY = (playerY < 0) ? 0 : (playerY >= height ? height : playerY);

    // Draw the player at the new location
    Console.SetCursorPosition(playerX, playerY);
    Console.Write(player);
}

// Clears the console, displays the food and player
void InitializeGame() 
{
    Console.Clear();
    ShowFood();
    Console.SetCursorPosition(0, 0);
    Console.Write(player);
}

void EndGame(){
    Console.Clear();
    Console.WriteLine("Console was resized. Program exiting");
    shouldExit = true;
}
*/

//Error handeling 
try
{
    OperatingProcedure1();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine("Exiting application.");
}

static void OperatingProcedure1()
{
    string[][] userEnteredValues = new string[][]
    {
        new string[] { "1", "two", "3"},
        new string[] { "0", "1", "2"}
    };

    foreach(string[] userEntries in userEnteredValues)
    {
        try
        {
            BusinessProcess1(userEntries);
        }
        catch (Exception ex)
        {
            if (ex.StackTrace.Contains("BusinessProcess1"))
            {
                if (ex is FormatException)
                {
                    Console.WriteLine(ex.Message);
                    Console.WriteLine("Corrective action taken in OperatingProcedure1");
                }
                else if (ex is DivideByZeroException)
                {
                    Console.WriteLine(ex.Message);
                    Console.WriteLine("Partial correction in OperatingProcedure1 - further action required");

                    // re-throw the original exception
                    throw;
                }
                else
                {
                    // create a new exception object that wraps the original exception
                    throw new ApplicationException("An error occurred - ", ex);
                }
            }
        }

    }
}

static void BusinessProcess1(string[] userEntries)
{
    int valueEntered;

    foreach (string userValue in userEntries)
    {
        try
        {
            valueEntered = int.Parse(userValue);

            checked
            {
                int calculatedValue = 4 / valueEntered;
            }
        }
        catch (FormatException)
        {
            FormatException invalidFormatException = new FormatException("FormatException: User input values in 'BusinessProcess1' must be valid integers");
            throw invalidFormatException;
        }
        catch (DivideByZeroException)
        {
            DivideByZeroException unexpectedDivideByZeroException = new DivideByZeroException("DivideByZeroException: Calculation in 'BusinessProcess1' encountered an unexpected divide by zero");
            throw unexpectedDivideByZeroException;

        }
    }
}