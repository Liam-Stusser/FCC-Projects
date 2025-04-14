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

string[] orderIds = ["B123","C234","A345","C15","B177","G3003","C235","B179"];

foreach(string id in orderIds){
    if(id.StartsWith("B")){
        Console.WriteLine(id);
    }
}

