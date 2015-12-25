// ==UserScript==
// @name         Health Warning
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Play a sound when you go below half health.
// @author       Kateus
// @match        http://amar.bornofsnails.net/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


function playWarningSound()
{
    var customAudio = new Audio("http://amar.brooksmcmillin.com/alarm.mp3");
    customAudio.play();
}

NPC.prototype.updateHealth = function(currentHealth,totalHealth) {
    
    // Start Original Function
	if(this.healthBar == null) {
		this.healthBar = this.drawHealth(currentHealth,totalHealth);
		this.html.insertBefore(this.healthBar,this.abilityBar);
	}
	else if(this.currentHealthBar != null) {
		var width = Math.floor(Math.max(1,currentHealth / totalHealth * 100 - 2));
		this.currentHealthBar.style.width = width + "px";
	}
	this.healthText.innerHTML = Math.round(currentHealth) + " / " + totalHealth;
    // End Original Function
    
    if(this["data"]["id"][0] == "p") // Check if this is a player object
    {
        if(currentHealth <= (totalHealth/2))
        {
            playWarningSound();
        }
    }
}

console.log("Health Warning Loaded");
