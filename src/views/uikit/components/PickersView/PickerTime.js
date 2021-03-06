import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Block from '~/components/Block';
import { TextField } from '@mui/material';
import {
  TimePicker,
  MobileTimePicker,
  StaticTimePicker,
  DesktopTimePicker
} from '@mui/lab';

// ----------------------------------------------------------------------

function PickerTime() {
  const [value, setValue] = useState(new Date());

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Basic">
          <TimePicker
            label="12 hours"
            value={value}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => <TextField {...params} margin="normal" />}
          />
          <TimePicker
            ampm={false}
            label="24 hours"
            value={value}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => <TextField {...params} margin="normal" />}
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Responsiveness">
          <MobileTimePicker
            label="For mobile"
            value={value}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
          <DesktopTimePicker
            label="For desktop"
            value={value}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => (
              <TextField {...params} margin="normal" fullWidth />
            )}
          />
          <TimePicker
            value={value}
            onChange={setValue}
            renderInput={params => (
              <TextField {...params} margin="normal" fullWidth />
            )}
          />
        </Block>
      </Grid>

      <Grid item xs={12}>
        <Block title="Static mode">
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <StaticTimePicker
                orientation="portrait"
                displayStaticWrapperAs="mobile"
                value={value}
                onChange={newValue => {
                  setValue(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={value}
                onChange={newValue => {
                  setValue(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </Block>
      </Grid>
    </Grid>
  );
}

export default PickerTime;
