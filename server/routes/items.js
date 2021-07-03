const express = require("express")
const router = express.Router()
const Item = require('../models/Item');
const passport = require('passport')
const User = require('../models/User')

// get all the products
router.get("/", (req, res) => {
    Item.find()
        .populate('seller', "_id name")
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ noItemsFound: "No items found" }));
});


// Create a product by the user
router.post('/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { title, description, price, picture, category } = req.body
        if (!title || !price) {
            return res.status(422).json({ error: "please add all the required fields" })
        }
        req.user.password = undefined
        const newItem = new Item({
            seller: req.user,
            title,
            description,
            price,
            picture,
            category
        });

        newItem
            .save()
            .then(item => res.json(item))
            .catch(err => console.log(err))
    }
);

// get a single product
router.get("/:item_id", (req, res) => {
    Item.findById(req.params.item_id)
        .then(item => res.json(item))
        .catch(err =>
            res.status(404).json({ noItemsFound: "No item found with that ID" })
        );
});

// update the products
router.patch("/:id", (req, res) => {
    Item.findOneAndUpdate({ _id: req.params.id },
        {
            $set:
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                picture: req.body.picture,
            }
        }).then(item => {
            if (item) {
                User.findById(item.seller)
                    .then(user => {
                        if (user) {
                            const filter = {
                                _id: user._id,
                                name: user.name,
                                email: user.email
                            }
                            res.json({ item, user: filter })
                        }
                    })
            }
        })
});

// Deleting the product by the User
router.delete("/:item_id", passport.authenticate('jwt', { session: false }), (req, res) => {
    Item.findByIdAndRemove(req.params.item_id, err => {
        if (err) res.send(err);
        else res.json({
            message: "the product has been deleted"
        });
    });
});


module.exports = router