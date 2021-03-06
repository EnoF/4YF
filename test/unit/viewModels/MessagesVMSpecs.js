/*
 * For Your Feed (4YF)
 * Version: 0.1.0
 *
 * Copyright (c) 2014.
 */
(function MessagesVMSpecsScope() {
    'use strict';

    describe('Messages ViewModel Specs', function MessagesVMSpecs() {

        var scope;

        beforeEach(module('4yf'));

        beforeEach(inject(function injection($controller, $rootScope) {
            scope = $rootScope.$new();
            $controller('MessagesVM', {
                $scope: scope
            });
        }));

        it('should contain a demo array of messages', function arrayFilled() {
            expect(scope.messages instanceof Array).toEqual(true);
            expect(scope.messages.length).toBeGreaterThan(1);
        });
    });
}());