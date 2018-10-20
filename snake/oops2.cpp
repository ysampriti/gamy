#include<iostream>
#include<string>
using namespace std;
class delivery;
class delivery{
	int date_of_delivery;
	int date;
public:
	void status();
	
	void reachable_or_not(int );
};
class package{
	string source_city;
	string destination_city;
public:
	package(string a, string b){
		source_city=a;
		destination_city= b;
	}
	int pin[4]={'1', '2', '3', '4'};
	
	friend int addpin(string);
	friend void delivery::reachable_or_not(int);
};


int addpin(package p1){
	if (p1.destination_city=="Delhi")
		return 1;
	if (p1.destination_city=="Mumbai")
		return 2;
	if (p1.destination_city=="Bangalore")
		return 3;
	if (p1.destination_city=="Delhi")
		return 4;
}
void reachable_or_not(){
		if (p1.pin==1||p1.pin==2||p1.pin==3||p1.pin==4)
			cout<<"Reachable";
		else cout<<"Not Reachable";
	}
int main()
{   package p1;
	string source_city="Delhi";
	string destination_city="Pune";
	
	int code=addpin(destination_city);
	reachable_or_not(code);
	return 0;
}
