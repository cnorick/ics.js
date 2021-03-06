/*global describe, it, cal, assert */

(function () {
    'use strict';
    describe('Load ics Object', function () {
        describe('Calendar Events Array', function () {
            it('should be an empty array initially', function () {
                assert.isArray(cal.events(), 'calendarEvents not an array');
                assert.lengthOf(cal.events(), '0');
            });
        });
        describe('Calendar String', function () {
            it('should be a string with no events', function () {
                assert.strictEqual(cal.calendar(), 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\n\r\nEND:VCALENDAR', 'calendar does not match');
            });
        });
    });
    describe('Add 1 Event', function () {
        describe('Calendar Events Array', function () {
            it('should have one event', function () {
                cal.addEvent('Christmas', 'Christian holiday celebrating the birth of Jesus Christ', 'Bethlehem', '12/25/2013', '12/25/2013');
                assert.isArray(cal.events(), 'calendarEvents not an array');
                assert.lengthOf(cal.events(), '1');
                assert.strictEqual(cal.events()[0], 'BEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:Christian holiday celebrating the birth of Jesus Christ\nDTSTART;VALUE=DATE:20131225T000000\nDTEND;VALUE=DATE:20131225T000000\nLOCATION:Bethlehem\nSUMMARY;LANGUAGE=en-us:Christmas\nTRANSP:TRANSPARENT\nEND:VEVENT');
            });
        });
        describe('Calendar String', function () {
            it('should have one event', function () {
                assert.strictEqual(cal.calendar(), 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:Christian holiday celebrating the birth of Jesus Christ\nDTSTART;VALUE=DATE:20131225T000000\nDTEND;VALUE=DATE:20131225T000000\nLOCATION:Bethlehem\nSUMMARY;LANGUAGE=en-us:Christmas\nTRANSP:TRANSPARENT\nEND:VEVENT\nEND:VCALENDAR', 'calendar does not match');
            });
        });
        describe('Calendar String of Single Digit Months', function () {
            it('should have one event', function () {
                cal.addEvent('Easter', 'Christian holiday celebrating the resurrection of Jesus Christ', 'Jerusalem', '04/20/2014', '04/20/2014');
                assert.strictEqual(cal.events()[1], 'BEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:Christian holiday celebrating the resurrection of Jesus Christ\nDTSTART;VALUE=DATE:20140420T000000\nDTEND;VALUE=DATE:20140420T000000\nLOCATION:Jerusalem\nSUMMARY;LANGUAGE=en-us:Easter\nTRANSP:TRANSPARENT\nEND:VEVENT');
            });
        });
        describe('Calendar String of Single Digit Day', function () {
            it('should have one event', function () {
                cal.addEvent('April Fools Day', 'What isn\'t is', 'America', '4/1/2014', '4/1/2014');
                assert.strictEqual(cal.events()[2], 'BEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:What isn\'t is\nDTSTART;VALUE=DATE:20140401T000000\nDTEND;VALUE=DATE:20140401T000000\nLOCATION:America\nSUMMARY;LANGUAGE=en-us:April Fools Day\nTRANSP:TRANSPARENT\nEND:VEVENT');
            });
        });

        describe('Recurring Events', function () {
          it('should add recurring events using frequency and until', function () {
            cal.addEvent('Soccer Practice', 'Practice kicking the ball in the net!  YAYY!!', 'Soccer field', '08/18/2014', '09/18/2014', {freq: 'WEEKLY', until: '08/18/2014'});
            assert.strictEqual(cal.events()[3], 'BEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:Practice kicking the ball in the net!  YAYY!!\nDTSTART;VALUE=DATE:20140818T000000\nRRULE:FREQ=WEEKLY;UNTIL=20140818T000000Z\nDTEND;VALUE=DATE:20140918T000000\nLOCATION:Soccer field\nSUMMARY;LANGUAGE=en-us:Soccer Practice\nTRANSP:TRANSPARENT\nEND:VEVENT');
          });

          it('should add recurring events using interval and count', function () {
            cal.addEvent('Soccer Practice', 'Practice kicking the ball in the net!  YAYY!!', 'Soccer field', '08/18/2014', '09/18/2014', {freq: 'WEEKLY', interval: 2, count: 10});
            assert.strictEqual(cal.events()[4], 'BEGIN:VEVENT\nCLASS:PUBLIC\nDESCRIPTION:Practice kicking the ball in the net!  YAYY!!\nDTSTART;VALUE=DATE:20140818T000000\nRRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=10\nDTEND;VALUE=DATE:20140918T000000\nLOCATION:Soccer field\nSUMMARY;LANGUAGE=en-us:Soccer Practice\nTRANSP:TRANSPARENT\nEND:VEVENT');
          });
        });
    });
})();
