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
