BUILD 9.9.14.1 – CSS FIX (TEST)

Basis: BUILD 9.9.14 Music Player Button Test.
Ursache: Im veröffentlichten Browser wurden die Player-Klassen aus style.css nicht angewendet.
Fix: kritische Button-CSS-Regeln zusätzlich direkt im <head> der index.html; style.css mit Versionsparameter ?v=9.9.14.1 gegen alten Browser-/CDN-Cache.
Unverändert: alle Songs, Bilder, Layoutbereiche, Skripte und externe Player-Verlinkung.

Installation: Gesamten ZIP-Inhalt ins Homepage-Repository kopieren, Änderungen committen und pushen. Auf blackmagic-smeety.de Desktop + Mobil testen. Noch kein Master.
