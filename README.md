# Anteng Web Greeter Theme

![](https://i.ibb.co/h8PsHzr/2024-02-20-07-25.webp)
![enter image description here](https://i.ibb.co/6nVDKjt/2024-02-20-07-26.webp)

## Description

This is repository for my web greeter theme using LightDM that matching for my [dotfiles](https://github.com/notokrs/anteng-dotfiles) .

## Prerequisites

1. This theme is only for LightDM. If you use other than that, then this theme is not for you.
2. Install [web-greeter](https://github.com/JezerM/web-greeter) for LightDM.
3. Change your `greeter-session` in your LightDM config : `/etc/lightdm/lightdm.conf`.
   ```
   [Seat:*]
   ...
   greeter-session=lightdm-web-greeter
   ...
   ```
4. Go to installation step.

## Installation

1. Clone this repo.
   `git clone https://github.com/notokrs/anteng-webgreeter-themes`
2. Copy this repo to `/usr/share/web-greeter/themes/`.
   `cp -r anteng-webgreeter-themes /usr/share/web-greeter/themes/`
3. Edit your web-greeter config: `etc/lightdm/web-greeter.yml`.
   ```
   greeter:
   	...
   	theme: anteng-webgreeter-theme
   	...
   ```
4. Restart your computer.
