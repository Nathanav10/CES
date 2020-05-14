Examples:

config parameter:

node main.js config -p baseCommission -v 5

exchange:

node main.js exchange -a 1000 -b usd
node main.js exchange -a 1000 -b usd -t gbp

loan:

node main.js loan -a 1000 -b usd

end loan:

node main.js endLoan --id <loan_id> -t ils

in there db there are already a few loans to test cases with:

node main.js endLoan --id id1 -t ils : this loan has already ended, will result in error

node main.js endLoan --id id2 -t ils : this loan belongs to another store, will result in error

permissions:

added "store2" with only exchange permission, the client should send this id to test. 
