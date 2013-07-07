CascadedCombobox
================
[![Build Status](https://travis-ci.org/imevs/CascadedCombobox.png?branch=master)](https://travis-ci.org/imevs/CascadedCombobox)

[Demo on heroku](http://extjs-cascadedcombobox-widget.herokuapp.com/)

## Description

Component CascadedCombobox provide ability to make relations between instances of standard extjs component ComboBox.
In addition it provide next functionality:
 * fetching default values from request param
 * storing selected values into cookies
 * AutoDiscover values in comboboxes if possible, for example:
    if there are only one option in combobox, it's logically to select this one


## Get The Code

Note that this repository uses two required submodules.  To get all of the code
you need, please use the following commands:

```
git clone https://github.com/imevs/CascadedCombobox
git submodule init
git submodule update
```

## Dependencies
 * extjs 4.1.1
 * siesta 1.1.5-lite
 * js-test-driver 1.3.5

 TODO:
 * generate permalink
 * priority between fetching value from cookie and request param