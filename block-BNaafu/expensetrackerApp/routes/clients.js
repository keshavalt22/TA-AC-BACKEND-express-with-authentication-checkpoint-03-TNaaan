let express = require('express');
let router = express.Router();
let Income = require('../models/income');
let Expense = require('../models/Expense');


//render income create form
router.get('/income/new', (req, res, next) => {
    res.render('incomeForm');
});

//add income
router.post('/income', (req, res, next) => {
    req.body.userId = req.user.id;
    Income.create(req.body, (err, income) => {
        if(err) return next(err);
        console.log(income);
        User.findByIdAndUpdate(req.user.id, {$push: {incomes: income.id}}, (err, user) => {
            if(err) return next(err);
            req.flash("info", "Income is added");
            res.redirect('/clients/income/new');
        })
    })
});

//render expense create form
router.get('/expense/new', (req, res, next) => {
    let info = req.flash('info')[0];
    res.render('expenseForm', {info});
});

//add expense
router.post('/expense', (req, res, next) => {
    req.body.userId = req.user.id;
    req.body.category = req.body.category.trim().split(" ").map(e => e.toLowerCase());
    Expense.create(req.body, (err, expense) => {
        if(err) return next(err);
        User.findByIdAndUpdate(req.user.id, {$push: {expenses: expense.id}}, (err, user) => {
            if(err) return next(err);
            req.flash("info", "Expense is added");
            res.redirect('/clients/expense/new');
        })
        
    })
});


module.exports = router;