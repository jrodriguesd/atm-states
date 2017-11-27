import test from 'ava';
import StatesService from '../lib/states.js';

const s = new StatesService();

/**
 * getEntry() test cases
 */

test('should get entry 1', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 1), 'A');
});

test('should get entry 2', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 2), 'BCD');
}) ;
    
test('should get entry 3', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 3), 'EFG');
});

test('should get entry 4', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 4), 'HIJ');
});

test('should get entry 5', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 5), 'KLM');
});

test('should get entry 6', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 6), 'NOP');
});

test('should get entry 7', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 7), 'QRS');
});

test('should get entry 8', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 8), 'TUV');
});

test('should get entry 9', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 9), 'WXY');
});

test('should get entry 10', t => {
  t.deepEqual(s.getEntry('000ABCDEFGHIJKLMNOPQRSTUVWXY', 10), null);
});

/**
 * parseState()
 */
test('should return null if state number is invalid', t => {
  t.deepEqual(s.parseState('XYZA870500128002002002001127'), null);
});

test('should parse state A properly', t => {
  let parsed = new Map();
  
  parsed.set('description', 'Card read state');
  parsed.set('number', '000'); 
  parsed.set('type', 'A');
  parsed.set('screen_number', '870');
  parsed.set('good_read_next_state', '500'); 
  parsed.set('error_screen_number', '128');
  parsed.set('read_condition_1', '002');
  parsed.set('read_condition_2', '002');
  parsed.set('read_condition_3', '002');
  parsed.set('card_return_flag', '001');
  parsed.set('no_fit_match_next_state', '127');
  parsed.set('states_to', ['500', '127']);
  
  t.deepEqual(s.parseState('000A870500128002002002001127'), parsed);
});

test('should parse state B properly', t => {
  let parsed = new Map();
  
  parsed.set('description', 'PIN Entry state');
  parsed.set('number', '024');
  parsed.set('type', 'B');
  parsed.set('screen_number', '024');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('local_pin_check_good_next_state', '026');
  parsed.set('local_pin_check_max_bad_pins_next_state', '026');
  parsed.set('local_pin_check_error_screen', '138');
  parsed.set('remote_pin_check_next_state', '026');
  parsed.set('local_pin_check_max_retries', '003');
  parsed.set('states_to', [ '002', '131', '026', '026', '026' ]);

  t.deepEqual(s.parseState('024B024002131026026138026003'), parsed);
});

test('should parse state b properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Customer selectable PIN state');
  parsed.set('number', '230');
  parsed.set('type', 'b');
  parsed.set('first_entry_screen_number', '063');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('good_read_next_state', '232');
  parsed.set('csp_fail_next_state', '000');
  parsed.set('second_entry_screen_number', '064');
  parsed.set('mismatch_first_entry_screen_number', '065');
  parsed.set('extension_state', '231');
  parsed.set('states_to', [ '002', '131', '232', '000' ]);

  t.deepEqual(s.parseState('230b063002131232000064065231'), parsed);
});

test('should parse state C properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Envelope Dispenser state');
  parsed.set('number', '634');
  parsed.set('type', 'C');
  parsed.set('next_state', '631');
  parsed.set('states_to', [ '631' ]);
      
  t.deepEqual(s.parseState('634C631791092174618362840503'), parsed);
});

test('should parse state D properly', t => {
  let parsed = new Map();

  parsed.set('description','PreSet Operation Code Buffer');
  parsed.set('number', '003');
  parsed.set('type', 'D');
  parsed.set('next_state', '024');
  parsed.set('clear_mask', '000');
  parsed.set('A_preset_mask', '128');
  parsed.set('B_preset_mask', '001');
  parsed.set('C_preset_mask', '002');
  parsed.set('D_preset_mask', '003');
  parsed.set('extension_state', '005');
  parsed.set('states_to', [ '024' ]);

  t.deepEqual(s.parseState('003D024000128001002003004005'), parsed);
});

test('should parse state E properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Four FDK selection state');
  parsed.set('number', '141');
  parsed.set('type', 'E');
  parsed.set('screen_number', '141');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_A_next_state', '255');
  parsed.set('FDK_B_next_state', '255');
  parsed.set('FDK_C_next_state', '571');
  parsed.set('FDK_D_next_state', '132');
  parsed.set('buffer_location', '000');
  parsed.set('states_to', [ '002', '131', '255', '255', '571', '132' ]);

  t.deepEqual(s.parseState('141E141002131255255571132000'), parsed);    
});

test('should parse state F properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Amount entry state');
  parsed.set('number', '219');
  parsed.set('type', 'F');
  parsed.set('screen_number', '069');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_A_next_state', '220');
  parsed.set('FDK_B_next_state', '255');
  parsed.set('FDK_C_next_state', '220');
  parsed.set('FDK_D_next_state', '219');
  parsed.set('amount_display_screen', '006');
  parsed.set('states_to', [ '002', '131', '220', '255', '220', '219' ]);
  
  t.deepEqual(s.parseState('219F069002131220255220219006'), parsed);    
});

test('should parse state G properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Amount check state');
  parsed.set('number', '073');
  parsed.set('type', 'G');
  parsed.set('amount_check_condition_true', '074');
  parsed.set('amount_check_condition_false', '07T');
  parsed.set('buffer_to_check', 'YUG');
  parsed.set('integer_multiple_value', 'HJV');
  parsed.set('decimal_places', 'BN3');
  parsed.set('currency_type', 'QWE');
  parsed.set('amount_check_condition', 'ASD');
  parsed.set('states_to', [ '074', '07T' ]);
  t.deepEqual(s.parseState('073G07407TYUGHJVBN3QWEASDZXC'), parsed);    
});

test('should parse state H properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Information Entry State');
  parsed.set('number', '089');
  parsed.set('type', 'H');
  parsed.set('screen_number', '564');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_A_next_state', '090');
  parsed.set('FDK_B_next_state', '255');
  parsed.set('FDK_C_next_state', '090');
  parsed.set('FDK_D_next_state', '089');
  parsed.set('buffer_and_display_params', '003');
  parsed.set('states_to', [ '002', '131', '090', '255', '090', '089' ]);

  t.deepEqual(s.parseState('089H564002131090255090089003'), parsed);    
});

test('should parse state I properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Transaction request state');
  parsed.set('number', '027');
  parsed.set('type', 'I');
  parsed.set('screen_number', '025');
  parsed.set('timeout_next_state', '146');
  parsed.set('send_track2', '001');
  parsed.set('send_track1_track3', '000');
  parsed.set('send_operation_code', '001');
  parsed.set('send_amount_data', '001');
  parsed.set('send_pin_buffer', '001');
  parsed.set('send_buffer_B_buffer_C', '003');
  parsed.set('states_to', [ '146' ]);

  t.deepEqual(s.parseState('027I025146001000001001001003'), parsed);        
});

test('should parse state J properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Close state');
  parsed.set('number', '002');
  parsed.set('type', 'J');
  parsed.set('receipt_delivered_screen', '132');
  parsed.set('next_state', '000');
  parsed.set('no_receipt_delivered_screen', '132');
  parsed.set('card_retained_screen_number', '136');
  parsed.set('statement_delivered_screen_number', '132');
  parsed.set('bna_notes_returned_screen', '081');
  parsed.set('extension_state', '178');

  t.deepEqual(s.parseState('002J132000132136132000081178'), parsed);        
});

test('should parse state k properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Smart FIT check state');
  parsed.set('number', '515');
  parsed.set('type', 'k');
  parsed.set('good_read_next_state', '001');
  parsed.set('card_return_flag', '001');
  parsed.set('no_fit_match_next_state', '127');
  parsed.set('states_to', [ '001' ]);

  t.deepEqual(s.parseState('515k000001000000000000001127'), parsed);        
});

test('should parse state K properly', t => {
  let parsed = new Map();

  parsed.set('description', 'FIT Switch state');
  parsed.set('number', '001');
  parsed.set('type', 'K');
  parsed.set('states_to', [ '003', '004', '004', '127', '127', '127', '127', '127' ] );

  t.deepEqual(s.parseState('001K003004004127127127127127'), parsed);        
});

test('should parse state m properly', t => {
  let parsed = new Map();

  parsed.set('description', 'PIN & Language Select State');
  parsed.set('number', '172');
  parsed.set('type', 'm');
  parsed.set('screen_number', '138');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('next_state_options_extension_state', '173');
  parsed.set('operation_codes_extension_state', '255');
  parsed.set('buffer_positions', '255');
  parsed.set('FDK_active_mask', '570');
  parsed.set('multi_language_screens_extension_state', '255');
  parsed.set('states_to', [ '002', '131' ]);
  t.deepEqual(s.parseState('172m138002131173255255570255'), parsed);        
});

test('should parse state U properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Device Fitness Flow Select State');
  parsed.set('number', '189');
  parsed.set('type', 'U');
  parsed.set('device_number', '035');
  parsed.set('device_available_next_state', '190');
  parsed.set('device_identifier_grafic', '113');
  parsed.set('device_unavailable_next_state', '201');
  parsed.set('device_subcomponent_identifier', '00q');
  parsed.set('states_to', [ '190', '201' ]);
  t.deepEqual(s.parseState('189U03519011320100q000000000'), parsed);        
});

test('should parse state W properly', t => {
  let parsed = new Map();

  parsed.set('description', 'FDK Switch state');
  parsed.set('number', '035');
  parsed.set('type', 'W');
  parsed.set('states', { 
    A: '181', 
    B: '037', 
    C: '255', 
    D: '127', 
    F: '031', 
    G: '034', 
    H: '250', 
    I: '186' 
  });
  parsed.set('states_to', [ '181', '037', '255', '127', '031', '034', '250', '186' ]);

  t.deepEqual(s.parseState('035W181037255127031034250186'), parsed);        
});

test('should parse state X properly', t => {
  let parsed = new Map();

  parsed.set('description', 'FDK information entry state');
  parsed.set('number', '037');
  parsed.set('type', 'X');
  parsed.set('screen_number', '037');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_next_state', '038');
  parsed.set('extension_state', '039');
  parsed.set('buffer_id', '010');
  parsed.set('FDK_active_mask', '255');
  parsed.set('states_to', [ '002', '131', '038' ]);
  t.deepEqual(s.parseState('037X037002131038039010255000'), parsed);        
});

test('should parse state Y properly', t => {
  let parsed = new Map();

  parsed.set('description', 'Eight FDK selection state');
  parsed.set('number', '011');
  parsed.set('type', 'Y');
  parsed.set('screen_number', '023');
  parsed.set('timeout_next_state', '002');
  parsed.set('cancel_next_state', '131');
  parsed.set('FDK_next_state', '012');
  parsed.set('extension_state', '255');
  parsed.set('buffer_positions', '004');
  parsed.set('FDK_active_mask', '052');
  parsed.set('multi_language_screens', '013');
  parsed.set('states_to', [ '002', '131', '012' ]);
  t.deepEqual(s.parseState('011Y023002131012255004052013'), parsed);        
});

